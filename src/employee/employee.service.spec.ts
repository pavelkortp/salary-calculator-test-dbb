import { Test, TestingModule } from '@nestjs/testing';
import { EmployeeService } from './employee.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { StaffMember } from '../base/entities/staff-member';
import { Repository } from 'typeorm';
import { StaffTypes } from '../base/constants';
import { StaffService } from '../base/staff.service';

describe('EmployeeService', () => {
  let service: EmployeeService;
  let staffRepository: Repository<StaffMember>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        EmployeeService,
        StaffService,
        {
          provide: getRepositoryToken(StaffMember),
          useValue: {
            findOne: jest.fn(),
            save: jest.fn(),
          },
        },
      ],
    }).compile();

    service = module.get<EmployeeService>(EmployeeService);
    staffRepository = module.get<Repository<StaffMember>>(
      getRepositoryToken(StaffMember),
    );
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should calculate salary correctly', async () => {
    const mockEmployee1 = new StaffMember();
    mockEmployee1.name = 'John Doe';
    mockEmployee1.joinDate = new Date(2020, 0, 1);
    mockEmployee1.baseSalary = 550;
    mockEmployee1.position = StaffTypes.EMPLOYEE;

    jest.spyOn(staffRepository, 'findOne').mockResolvedValue(mockEmployee1);
    jest.spyOn(staffRepository, 'save').mockResolvedValue(mockEmployee1);

    const salary = service.calculateSalary(
      mockEmployee1.id,
      new Date(2026, 0, 1),
    );
    salary.then((v) => {
      expect(v).toBe(649);
    });
  });
});
