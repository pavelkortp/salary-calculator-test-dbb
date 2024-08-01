import { IsDateString, IsOptional } from 'class-validator';

export class GetSalaryDto {
  @IsOptional()
  @IsDateString()
  date?: string = new Date(Date.now()).toString();
}
