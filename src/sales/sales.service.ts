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
import { SalaryCalculator } from '../interfaces/salary.calculator';

@Injectable()
export class SalesService {
  constructor(
    @Inject(forwardRef(() => StaffService))
    private staffService: StaffService,
  ) {}

  async create(createManagerDto: CreateStaffDto): Promise<StaffMember> {
    return await this.staffService.createStaff(
      createManagerDto,
      StaffTypes.SALES,
    );
  }

  async addSubordinate(
    salesId: number,
    subordinateId: number,
  ): Promise<StaffMember> {
    if (salesId == subordinateId) {
      throw new BadRequestException(
        'salesId and subordinateId must be not equal!',
      );
    }
    const sales = await this.findOne(salesId);
    if (sales.position != StaffTypes.SALES) {
      throw new BadRequestException(
        `Staff member with ${salesId} is not 'sales' worker`,
      );
    }
    const subordinate = await this.findOne(subordinateId);
    sales.subordinates.push(subordinate);
    return await this.staffService.updateStaff(sales);
  }

  async calculateSalary(id: number, date: Date): Promise<number> {
    const sales = await this.findOne(id);
    if (sales.position != StaffTypes.SALES) {
      throw new BadRequestException(
        `Staff member with ${id} is not 'sales' worker`,
      );
    }
    return SalaryCalculator.calculateSalary(sales, date);
  }

  async findOne(id: number): Promise<StaffMember> {
    return this.staffService.findOne(id);
  }
}
