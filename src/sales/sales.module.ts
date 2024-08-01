import { Module } from '@nestjs/common';
import { SalesService } from './sales.service';
import { SalesController } from './sales.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { StaffMember } from '../base/entities/staff-member';
import { StaffModule } from '../base/staff.module';

@Module({
  imports: [TypeOrmModule.forFeature([StaffMember]), StaffModule],
  controllers: [SalesController],
  providers: [SalesService],
})
export class SalesModule {}
