import { StaffController } from './staff.controller';
import { StaffService } from './staff.service';
import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { StaffMember } from './entities/staff-member';
import { CreateStaffDto } from './dto/create-staff.dto';
import { StaffTypes } from './constants';

describe('StaffController', () => {
  let controller: StaffController;
  let service: StaffService;
  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [StaffController],
      providers: [
        StaffService,
        {
          provide: getRepositoryToken(StaffMember),
          useValue: {
            find: jest.fn(),
            save: jest.fn(),
          },
        },
      ],
    }).compile();

    controller = module.get<StaffController>(StaffController);
    service = module.get<StaffService>(StaffService);
  });

  it('should calculate a total salary', async () => {
    const sales: CreateStaffDto = {
      name: 'John SALES',
      joinDate: new Date(2024, 7, 1),
      baseSalary: 550,
      position: StaffTypes.SALES,
    };

    const newSales = new StaffMember();
    newSales.id = 1;
    newSales.name = sales.name;
    newSales.joinDate = sales.joinDate;
    newSales.baseSalary = sales.baseSalary;
    newSales.position = sales.position;

    const newManager = new StaffMember();
    newManager.id = 2;
    newManager.name = 'MANAGER';
    newManager.joinDate = sales.joinDate;
    newManager.baseSalary = sales.baseSalary;
    newManager.position = StaffTypes.MANAGER;

    const newEmp1 = new StaffMember();
    newEmp1.name = '3';
    newEmp1.joinDate = sales.joinDate;
    newEmp1.baseSalary = sales.baseSalary;
    newEmp1.position = StaffTypes.EMPLOYEE;
    newEmp1.subordinates = [];

    const newEmp2 = new StaffMember();
    newEmp2.name = '4';
    newEmp2.joinDate = sales.joinDate;
    newEmp2.baseSalary = sales.baseSalary;
    newEmp2.position = StaffTypes.EMPLOYEE;
    newEmp2.subordinates = [];

    const newEmp3 = new StaffMember();
    newEmp3.name = '5';
    newEmp3.joinDate = sales.joinDate;
    newEmp3.baseSalary = sales.baseSalary;
    newEmp3.position = StaffTypes.EMPLOYEE;
    newEmp3.subordinates = [];

    newManager.subordinates = [newEmp1, newEmp2];

    newSales.subordinates = [newManager, newEmp3];

    jest
      .spyOn(service, 'findAll')
      .mockResolvedValue([newSales, newManager, newEmp1, newEmp2, newEmp3]);
    const date = '2026-08-01';
    const { totalSalary } = await controller.getTotalSalary({ date });
    expect(totalSalary).toBeCloseTo(2927.909);
  });
});
