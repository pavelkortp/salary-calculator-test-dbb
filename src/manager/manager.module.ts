import { Module } from '@nestjs/common';
import { ManagerService } from './manager.service';
import { ManagerController } from './manager.controller';
import { EmployeeModule } from '../employee/employee.module';
import { StaffModule } from '../base/staff.module';

@Module({
  imports: [EmployeeModule, StaffModule],
  controllers: [ManagerController],
  providers: [ManagerService],
})
export class ManagerModule {}
