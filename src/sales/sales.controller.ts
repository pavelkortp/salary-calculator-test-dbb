import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  ValidationPipe,
  ParseIntPipe,
} from '@nestjs/common';
import { SalesService } from './sales.service';
import { CreateStaffDto } from '../base/dto/create-staff.dto';
import { GetSalaryDto } from '../base/dto/get-salary.dto';
import { StaffMember } from '../base/entities/staff-member';

@Controller('sales')
export class SalesController {
  constructor(private readonly salesService: SalesService) {}

  @Post()
  async create(
    @Body(ValidationPipe) createSalesDto: CreateStaffDto,
  ): Promise<StaffMember> {
    return await this.salesService.create(createSalesDto);
  }

  @Post(':salesId/subordinate')
  addSubordinate(
    @Param('salesId', ParseIntPipe) salesId: number,
    @Body('subordinateId', ParseIntPipe) subordinateId: number,
  ): Promise<StaffMember> {
    return this.salesService.addSubordinate(salesId, subordinateId);
  }

  @Get(':id/salary')
  async calculateSalary(
    @Param('id', ParseIntPipe) id: number,
    @Body(ValidationPipe) { date }: GetSalaryDto,
  ): Promise<{ salary: number }> {
    const salary = await this.salesService.calculateSalary(id, new Date(date));
    return {
      salary,
    };
  }

  @Get(':id')
  findOne(@Param('id') id: string): Promise<StaffMember> {
    return this.salesService.findOne(+id);
  }
}
