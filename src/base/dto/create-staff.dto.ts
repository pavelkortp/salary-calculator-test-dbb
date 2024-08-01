import { IsDateString, IsPositive, IsString } from 'class-validator';
import { StaffTypes } from '../constants';

export class CreateStaffDto {
  @IsString()
  name: string;

  @IsDateString()
  joinDate: Date;

  @IsPositive()
  baseSalary: number;

  position: StaffTypes;
}
