import {
  BadRequestException,
  forwardRef,
  Inject,
  Injectable,
} from '@nestjs/common';
import { CreateStaffDto } from '../base/dto/create-staff.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { StaffMember } from '../base/entities/staff-member';
import {
  EMPLOYEE_MAX_SALARY_INCREASE,
  EMPLOYEE_YEAR_SALARY_INCREASE,
  MANAGER_MAX_SALARY_INCREASE,
  MANAGER_SUBORDINATES_SALARY_INCREASE,
  MANAGER_YEAR_SALARY_INCREASE,
  SALES_MAX_SALARY_INCREASE,
  SALES_YEAR_SALARY_INCREASE,
  StaffTypes,
} from '../base/constants';
import { StaffService } from '../base/staff.service';

@Injectable()
export class ManagerService {
  constructor(
    @InjectRepository(StaffMember)
    private repository: Repository<StaffMember>,
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
    const subordinate = await this.findOne(subordinateId);
    manager.subordinates.push(subordinate);
    return await this.repository.save(manager);
  }

  async calculateSalary(id: number, date: Date): Promise<number> {
    const manager = await this.findOne(id);
    const workedYears = date.getFullYear() - manager.joinDate.getFullYear();

    console.log(workedYears);

    const salaryForYears = this.staffService.calculateYearsBonus(
      workedYears,
      manager.baseSalary,
      MANAGER_MAX_SALARY_INCREASE,
      MANAGER_YEAR_SALARY_INCREASE,
    );

    const firsLevelSubordinatesSalary =
      MANAGER_SUBORDINATES_SALARY_INCREASE *
      manager.subordinates
        .map((e) => {
          const workedYears = date.getFullYear() - e.joinDate.getFullYear();
          return this.calculateSalaryForFirstLvlSubordinates(workedYears, e);
        })
        .reduce((sum, curr) => sum + curr);

    console.log(firsLevelSubordinatesSalary);
    return salaryForYears + firsLevelSubordinatesSalary;
  }

  calculateSalaryForFirstLvlSubordinates(
    workedYears: number,
    staff: StaffMember,
  ) {
    switch (staff.position) {
      case StaffTypes.MANAGER:
        return this.staffService.calculateYearsBonus(
          workedYears,
          staff.baseSalary,
          MANAGER_MAX_SALARY_INCREASE,
          MANAGER_YEAR_SALARY_INCREASE,
        );
      case StaffTypes.SALES:
        return this.staffService.calculateYearsBonus(
          workedYears,
          staff.baseSalary,
          SALES_MAX_SALARY_INCREASE,
          SALES_YEAR_SALARY_INCREASE,
        );
      case StaffTypes.EMPLOYEE:
        return this.staffService.calculateYearsBonus(
          workedYears,
          staff.baseSalary,
          EMPLOYEE_MAX_SALARY_INCREASE,
          EMPLOYEE_YEAR_SALARY_INCREASE,
        );
    }
  }

  async findOne(id: number): Promise<StaffMember> {
    return this.staffService.findOne(id);
  }

  async remove(id: number) {
    await this.repository.delete(id);
  }
}
