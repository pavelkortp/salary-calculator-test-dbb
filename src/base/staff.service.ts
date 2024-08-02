import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { StaffMember } from './entities/staff-member';
import { Repository } from 'typeorm';
import { CreateStaffDto } from './dto/create-staff.dto';
import { StaffTypes } from './constants';
import { SalaryCalculator } from './salary.calculator';

@Injectable()
export class StaffService {
  private relations = ['subordinates'];

  constructor(
    @InjectRepository(StaffMember)
    private staffRepo: Repository<StaffMember>,
  ) {}

  async createStaff(
    staffDto: CreateStaffDto,
    position: StaffTypes,
  ): Promise<StaffMember> {
    staffDto.position = position;
    return await this.staffRepo.save(staffDto);
  }

  async updateStaff(updatedStaff: StaffMember): Promise<StaffMember> {
    return await this.staffRepo.save(updatedStaff);
  }

  async findOne(id: number): Promise<StaffMember> {
    const res = await this.staffRepo.findOne({
      where: { id },
      relations: this.relations,
    });
    if (!res) {
      throw new NotFoundException(`Staff with id ${id} not found`);
    }
    return res;
  }

  async getTotalSalary(date: Date): Promise<number> {
    const staffMembers: StaffMember[] = await this.staffRepo.find({
      relations: this.relations,
    });

    return staffMembers.reduce(
      (sum, sm) => sum + SalaryCalculator.calculateSalary(sm, date),
      0,
    );
  }
}
