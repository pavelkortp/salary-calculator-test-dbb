import { Module } from '@nestjs/common';
import { ManagerService } from './manager.service';
import { ManagerController } from './manager.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { StaffMember } from '../base/entities/staff-member';

@Module({
  imports: [TypeOrmModule.forFeature([StaffMember])],
  controllers: [ManagerController],
  providers: [ManagerService],
})
export class ManagerModule {}
