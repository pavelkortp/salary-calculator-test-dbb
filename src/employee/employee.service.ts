import { forwardRef, Inject, Injectable } from '@nestjs/common';
import { CreateStaffDto } from '../base/dto/create-staff.dto';
import { StaffMember } from '../base/entities/staff-member';
import {
  EMPLOYEE_MAX_SALARY_INCREASE,
  EMPLOYEE_YEAR_SALARY_INCREASE,
  StaffTypes,
} from '../base/constants';
import { StaffService } from '../base/staff.service';

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
    const workedYears = date.getFullYear() - employee.joinDate.getFullYear();
    if (workedYears < 1) return employee.baseSalary;
    return this.staffService.calculateYearsBonus(
      workedYears,
      employee.baseSalary,
      EMPLOYEE_MAX_SALARY_INCREASE,
      EMPLOYEE_YEAR_SALARY_INCREASE,
    );
  }

  async findOne(id: number): Promise<StaffMember> {
    return this.staffService.findOne(id);
  }
}
