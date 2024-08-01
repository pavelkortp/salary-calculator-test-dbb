import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  ValidationPipe,
  ParseIntPipe,
} from '@nestjs/common';
import { ManagerService } from './manager.service';
import { CreateStaffDto } from '../base/dto/create-staff.dto';
import { GetSalaryDto } from '../base/dto/get-salary.dto';
import { StaffMember } from '../base/entities/staff-member';

@Controller('managers')
export class ManagerController {
  constructor(private readonly managerService: ManagerService) {}

  @Post()
  async create(@Body(ValidationPipe) createManagerDto: CreateStaffDto) {
    return await this.managerService.create(createManagerDto);
  }

  @Post(':managerId/subordinate')
  addSubordinate(
    @Param('managerId', ParseIntPipe) managerId: number,
    @Body('subordinateId', ParseIntPipe)
    { subordinateId }: { subordinateId: number },
  ) {
    return this.managerService.addSubordinate(managerId, subordinateId);
  }

  @Get(':id/salary')
  async calculateSalary(
    @Param('id', ParseIntPipe) id: number,
    @Body(ValidationPipe)
    { date }: GetSalaryDto,
  ): Promise<{ salary: number }> {
    const salary = await this.managerService.calculateSalary(
      id,
      new Date(date),
    );
    return {
      salary,
    };
  }

  @Get(':id')
  findOne(@Param('id') id: string): Promise<StaffMember> {
    return this.managerService.findOne(+id);
  }
}
