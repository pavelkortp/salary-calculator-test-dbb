import {
  Body,
  Controller,
  DefaultValuePipe,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Post,
  ValidationPipe,
} from '@nestjs/common';
import { EmployeeService } from './employee.service';
import { CreateStaffDto } from '../base/dto/create-staff.dto';
import { GetSalaryDto } from '../base/dto/get-salary.dto';
import { StaffMember } from '../base/entities/staff-member';

@Controller('employees')
export class EmployeeController {
  constructor(private readonly employeeService: EmployeeService) {}

  @Post()
  async create(@Body(ValidationPipe) createEmployeeDto: CreateStaffDto) {
    return await this.employeeService.create(createEmployeeDto);
  }

  @Get(':id/salary')
  async calculateSalary(
    @Param('id', ParseIntPipe) id: number,
    @Body(ValidationPipe, new DefaultValuePipe(new Date(Date.now())))
    { date }: GetSalaryDto,
  ): Promise<{ salary: number }> {
    const salary = await this.employeeService.calculateSalary(
      id,
      new Date(date),
    );
    return {
      salary,
    };
  }

  @Get(':id')
  async findOne(@Param('id', ParseIntPipe) id: number): Promise<StaffMember> {
    return await this.employeeService.findOne(id);
  }
}
