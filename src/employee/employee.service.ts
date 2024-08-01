import { forwardRef, Inject, Injectable } from '@nestjs/common';
import { CreateStaffDto } from '../base/dto/create-staff.dto';
import { StaffMember } from '../base/entities/staff-member';
import { StaffTypes } from '../base/constants';
import { StaffService } from '../base/staff.service';
import { SalaryCalculator } from '../interfaces/salary.calculator';

@Injectable()
export class EmployeeService {
  constructor(
    @Inject(forwardRef(() => StaffService))
    private staffService: StaffService,
  ) {}

  async create(createEmployeeDto: CreateStaffDto): Promise<StaffMember> {
    return await this.staffService.createStaff(
      createEmployeeDto,
      StaffTypes.EMPLOYEE,
    );
  }

  async calculateSalary(id: number, date: Date): Promise<number> {
    const employee = await this.findOne(id);
    return SalaryCalculator.calculateSalary(employee, date);
  }

  async findOne(id: number): Promise<StaffMember> {
    return this.staffService.findOne(id);
  }
}
