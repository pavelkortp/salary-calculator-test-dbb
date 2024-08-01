import { Module } from '@nestjs/common';
import { EmployeeService } from './employee.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { StaffMember } from '../base/entities/staff-member';
import { EmployeeController } from './employee.controller';
import { StaffModule } from '../base/staff.module';

@Module({
  imports: [TypeOrmModule.forFeature([StaffMember]), StaffModule],
  providers: [EmployeeService],
  controllers: [EmployeeController],
  exports: [EmployeeService],
})
export class EmployeeModule {}
