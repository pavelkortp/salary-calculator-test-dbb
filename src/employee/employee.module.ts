import { Module } from '@nestjs/common';
import { EmployeeService } from './employee.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { StaffMember } from '../base/entities/staff-member';
import { EmployeeController } from './employee.controller';

@Module({
  imports: [TypeOrmModule.forFeature([StaffMember])],
  providers: [EmployeeService],
  controllers: [EmployeeController],
})
export class EmployeeModule {}
