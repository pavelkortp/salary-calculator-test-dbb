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
  ): Promise<{ employeeSalary: number }> {
    const employeeSalary = await this.employeeService.calculateSalary(
      id,
      new Date(date),
    );
    return {
      employeeSalary,
    };
  }

  @Get(':id')
  async findOne(@Param('id', ParseIntPipe) id: number) {
    return await this.employeeService.findOne(id);
  }

  @Delete(':id')
  async remove(@Param('id', ParseIntPipe) id: number) {
    return await this.employeeService.remove(id);
  }
}
