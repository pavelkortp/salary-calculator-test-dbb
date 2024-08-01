import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { StaffMember } from './entities/staff-member';
import { Repository } from 'typeorm';
import { CreateStaffDto } from './dto/create-staff.dto';
import { StaffTypes } from './constants';

@Injectable()
export class StaffService {
  constructor(
    @InjectRepository(StaffMember)
    private staffRepo: Repository<StaffMember>,
  ) {}

  async createStaff(
    staffDto: CreateStaffDto,
    position: StaffTypes,
  ): Promise<StaffMember> {
    staffDto.position = position;
    return await this.staffRepo.save(staffDto);
  }

  async updateStaff(updatedStaff: StaffMember): Promise<StaffMember> {
    return await this.staffRepo.save(updatedStaff);
  }

  async findOne(id: number): Promise<StaffMember> {
    const res = await this.staffRepo.findOne({
      where: { id },
      relations: ['subordinates'],
    });
    if (!res) {
      throw new NotFoundException(`Staff with id ${id} not found`);
    }
    return res;
  }

  calculateYearsBonus(
    workedYears: number,
    baseSalary: number,
    maxIncrease: number,
    yearIncrease: number,
  ): number {
    const maxSalaryForWorkedYears = baseSalary * (1 + maxIncrease);
    let increased = baseSalary;
    for (let i = 1; i <= workedYears; i++) {
      increased += baseSalary * yearIncrease;
    }
    return Math.min(maxSalaryForWorkedYears, increased);
  }
}
