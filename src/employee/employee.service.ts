import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateStaffDto } from '../base/dto/create-staff.dto';
import { StaffMember } from '../base/entities/staff-member';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { StaffTypes } from '../base/constants';

const MAX_SALARY_INCREASE = 0.3;
const YEAR_SALARY_INCREASE = 0.03;

@Injectable()
export class EmployeeService {
  constructor(
    @InjectRepository(StaffMember)
    private repository: Repository<StaffMember>,
  ) {}

  async create(createEmployeeDto: CreateStaffDto): Promise<StaffMember> {
    createEmployeeDto.position = StaffTypes.EMPLOYEE;
    return await this.repository.save(createEmployeeDto);
  }

  async calculateSalary(id: number, date: Date): Promise<number> {
    const employee = await this.findOne(id);
    const workedYears = date.getFullYear() - employee.joinDate.getFullYear();
    if (workedYears < 1) return employee.baseSalary;
    const maxSalary = employee.baseSalary * (1 + MAX_SALARY_INCREASE);

    let increased = employee.baseSalary;
    for (let i = 1; i <= workedYears; i++) {
      increased += employee.baseSalary * YEAR_SALARY_INCREASE;
    }

    return Math.min(maxSalary, increased);
  }

  async findOne(id: number): Promise<StaffMember> {
    const res = await this.repository.findOne({ where: { id } });
    if (!res) {
      throw new NotFoundException(`Employee with id ${id} not found`);
    }
    return res;
  }

  async remove(id: number) {
    await this.repository.delete(id);
  }
}
