import {
  BadRequestException,
  forwardRef,
  Inject,
  Injectable,
} from '@nestjs/common';
import { CreateStaffDto } from '../base/dto/create-staff.dto';
import { StaffMember } from '../base/entities/staff-member';
import { StaffTypes } from '../base/constants';
import { StaffService } from '../base/staff.service';
import { SalaryCalculator } from '../base/salary.calculator';

@Injectable()
export class ManagerService {
  constructor(
    @Inject(forwardRef(() => StaffService))
    private staffService: StaffService,
  ) {}

  async create(createManagerDto: CreateStaffDto): Promise<StaffMember> {
    return await this.staffService.createStaff(
      createManagerDto,
      StaffTypes.MANAGER,
    );
  }

  async addSubordinate(
    managerId: number,
    subordinateId: number,
  ): Promise<StaffMember> {
    if (managerId == subordinateId) {
      throw new BadRequestException(
        'mangerId and subordinateId must be not equal!',
      );
    }
    const manager = await this.findOne(managerId);
    if (manager.position != StaffTypes.MANAGER) {
      throw new BadRequestException(
        `Staff member with ${managerId} is not 'MANAGER' worker`,
      );
    }
    const subordinate = await this.findOne(subordinateId);
    manager.subordinates.push(subordinate);
    return await this.staffService.updateStaff(manager);
  }

  async calculateSalary(id: number, date: Date): Promise<number> {
    const manager = await this.findOne(id);
    if (manager.position != StaffTypes.MANAGER) {
      throw new BadRequestException(
        `Staff member with ${id} is not 'MANAGER' worker`,
      );
    }
    return SalaryCalculator.calculateSalary(manager, date);
  }

  async findOne(id: number): Promise<StaffMember> {
    return this.staffService.findOne(id);
  }
}
