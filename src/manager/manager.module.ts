import { Module } from '@nestjs/common';
import { ManagerService } from './manager.service';
import { ManagerController } from './manager.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { StaffMember } from '../base/entities/staff-member';
import { EmployeeModule } from '../employee/employee.module';
import { StaffModule } from '../base/staff.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([StaffMember]),
    EmployeeModule,
    StaffModule,
  ],
  controllers: [ManagerController],
  providers: [ManagerService],
})
export class ManagerModule {}
