import { EmployeeController } from './employee.controller';
import { StaffMember } from '../base/entities/staff-member';
import { Test, TestingModule } from '@nestjs/testing';
import { EmployeeService } from './employee.service';
import { StaffService } from '../base/staff.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { CreateStaffDto } from '../base/dto/create-staff.dto';
import { StaffTypes } from '../base/constants';

describe('EmployeeController', () => {
  let controller: EmployeeController;
  let service: EmployeeService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [EmployeeController],
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

    controller = module.get<EmployeeController>(EmployeeController);
    service = module.get<EmployeeService>(EmployeeService);
  });

  it('should successfully create a new employee', async () => {
    const createEmployeeDto: CreateStaffDto = {
      name: 'John Doe',
      joinDate: new Date(),
      baseSalary: 1000,
      position: StaffTypes.EMPLOYEE,
    };

    const newEmployee = new StaffMember();
    newEmployee.id = 1;
    newEmployee.name = createEmployeeDto.name;
    newEmployee.joinDate = createEmployeeDto.joinDate;
    newEmployee.baseSalary = createEmployeeDto.baseSalary;
    newEmployee.position = createEmployeeDto.position;

    jest.spyOn(service, 'create').mockResolvedValue(newEmployee);

    const result = await controller.create(createEmployeeDto);
    expect(result).toEqual(newEmployee);
  });

  it('should successfully calculates a salary for one employee', async () => {
    const createEmployeeDto: CreateStaffDto = {
      name: 'John Doe',
      joinDate: new Date(2024, 7, 1),
      baseSalary: 1000,
      position: StaffTypes.EMPLOYEE,
    };

    const newEmployee = new StaffMember();
    newEmployee.id = 1;
    newEmployee.name = createEmployeeDto.name;
    newEmployee.joinDate = createEmployeeDto.joinDate;
    newEmployee.baseSalary = createEmployeeDto.baseSalary;
    newEmployee.position = createEmployeeDto.position;

    jest.spyOn(service, 'create').mockResolvedValue(newEmployee);
    jest.spyOn(service, 'findOne').mockResolvedValue(newEmployee);
    const result = await controller.create(createEmployeeDto);
    const { salary } = await controller.calculateSalary(result.id, {
      date: '2026-08-01',
    });
    expect(salary).toBe(1060);
  });
});
