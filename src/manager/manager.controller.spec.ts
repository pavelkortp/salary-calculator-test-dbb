import { ManagerController } from './manager.controller';
import { ManagerService } from './manager.service';
import { Test, TestingModule } from '@nestjs/testing';
import { StaffService } from '../base/staff.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { StaffMember } from '../base/entities/staff-member';
import { CreateStaffDto } from '../base/dto/create-staff.dto';
import { StaffTypes } from '../base/constants';

describe('ManagerController', () => {
  let controller: ManagerController;
  let service: ManagerService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ManagerController],
      providers: [
        ManagerService,
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

    controller = module.get<ManagerController>(ManagerController);
    service = module.get<ManagerService>(ManagerService);
  });

  it('should successfully create a new manager', async () => {
    const createStaffDto: CreateStaffDto = {
      name: 'John Doe',
      joinDate: new Date(),
      baseSalary: 550,
      position: StaffTypes.MANAGER,
    };

    const newManager = new StaffMember();
    newManager.id = 1;
    newManager.name = createStaffDto.name;
    newManager.joinDate = createStaffDto.joinDate;
    newManager.baseSalary = createStaffDto.baseSalary;
    newManager.position = createStaffDto.position;

    jest.spyOn(service, 'create').mockResolvedValue(newManager);

    const result = await controller.create(createStaffDto);
    expect(result).toEqual(newManager);
  });

  it('should successfully calculate manager salary', async () => {
    const manager: CreateStaffDto = {
      name: 'John Doe',
      joinDate: new Date(2024, 7, 1),
      baseSalary: 550,
      position: StaffTypes.MANAGER,
    };

    const newManager = new StaffMember();
    newManager.id = 1;
    newManager.name = manager.name;
    newManager.joinDate = manager.joinDate;
    newManager.baseSalary = manager.baseSalary;
    newManager.position = manager.position;

    const newEmp1 = new StaffMember();
    newEmp1.name = '2';
    newEmp1.joinDate = manager.joinDate;
    newEmp1.baseSalary = manager.baseSalary;
    newEmp1.position = StaffTypes.EMPLOYEE;

    const newEmp2 = new StaffMember();
    newEmp2.name = '2';
    newEmp2.joinDate = manager.joinDate;
    newEmp2.baseSalary = manager.baseSalary;
    newEmp2.position = StaffTypes.EMPLOYEE;

    const newEmp3 = new StaffMember();
    newEmp3.name = '4';
    newEmp3.joinDate = manager.joinDate;
    newEmp3.baseSalary = manager.baseSalary;
    newEmp3.position = StaffTypes.EMPLOYEE;

    newManager.subordinates = [newEmp1, newEmp2, newEmp3];
    const date = '2026-08-01';
    jest.spyOn(service, 'findOne').mockResolvedValue(newManager);
    const { salary } = await controller.calculateSalary(1, {
      date,
    });
    expect(salary).toBe(613.745);
  });
});
