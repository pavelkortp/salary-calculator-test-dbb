import { Test, TestingModule } from '@nestjs/testing';
import { StaffService } from '../base/staff.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { StaffMember } from '../base/entities/staff-member';
import { SalesController } from './sales.controller';
import { SalesService } from './sales.service';
import { CreateStaffDto } from '../base/dto/create-staff.dto';
import { StaffTypes } from '../base/constants';

describe('Sales.controller', () => {
  let controller: SalesController;
  let service: SalesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [SalesController],
      providers: [
        SalesService,
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

    controller = module.get<SalesController>(SalesController);
    service = module.get<SalesService>(SalesService);
  });

  it('should successfully create a new sales', async () => {
    const createStaffDto: CreateStaffDto = {
      name: 'John SALES',
      joinDate: new Date(),
      baseSalary: 550,
      position: StaffTypes.SALES,
    };

    const newSales = new StaffMember();
    newSales.id = 1;
    newSales.name = createStaffDto.name;
    newSales.joinDate = createStaffDto.joinDate;
    newSales.baseSalary = createStaffDto.baseSalary;
    newSales.position = createStaffDto.position;

    jest.spyOn(service, 'create').mockResolvedValue(newSales);

    const result = await controller.create(createStaffDto);
    expect(result).toEqual(newSales);
  });

  it('should successfully calculate sales salary', async () => {
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
    newManager.id = 1;
    newManager.name = 'MANAGER';
    newManager.joinDate = sales.joinDate;
    newManager.baseSalary = sales.baseSalary;
    newManager.position = StaffTypes.MANAGER;

    const newEmp1 = new StaffMember();
    newEmp1.name = '2';
    newEmp1.joinDate = sales.joinDate;
    newEmp1.baseSalary = sales.baseSalary;
    newEmp1.position = StaffTypes.EMPLOYEE;
    newEmp1.subordinates = [];

    const newEmp2 = new StaffMember();
    newEmp2.name = '2';
    newEmp2.joinDate = sales.joinDate;
    newEmp2.baseSalary = sales.baseSalary;
    newEmp2.position = StaffTypes.EMPLOYEE;
    newEmp2.subordinates = [];

    const newEmp3 = new StaffMember();
    newEmp3.name = '4';
    newEmp3.joinDate = sales.joinDate;
    newEmp3.baseSalary = sales.baseSalary;
    newEmp3.position = StaffTypes.EMPLOYEE;
    newEmp3.subordinates = [];

    newManager.subordinates = [newEmp1, newEmp2];

    newSales.subordinates = [newManager, newEmp3];
    const date = '2026-08-01';
    jest.spyOn(service, 'findOne').mockResolvedValue(newSales);
    const { salary } = await controller.calculateSalary(1, {
      date,
    });
    expect(salary).toBeCloseTo(568.079);
  });
});
