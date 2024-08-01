import { Module } from '@nestjs/common';
import { SalesService } from './sales.service';
import { SalesController } from './sales.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { StaffMember } from '../base/entities/staff-member';

@Module({
  imports: [TypeOrmModule.forFeature([StaffMember])],
  controllers: [SalesController],
  providers: [SalesService],
})
export class SalesModule {}
