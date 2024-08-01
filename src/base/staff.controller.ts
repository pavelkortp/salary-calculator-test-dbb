import { Body, Controller, Get, ValidationPipe } from '@nestjs/common';
import { StaffService } from './staff.service';
import { GetSalaryDto } from './dto/get-salary.dto';

@Controller()
export class StaffController {
  constructor(private service: StaffService) {}

  @Get('totalSalary')
  async getTotalSalary(
    @Body(ValidationPipe) { date }: GetSalaryDto,
  ): Promise<{ totalSalary: number }> {
    const totalSalary = await this.service.getTotalSalary(new Date(date));
    return {
      totalSalary,
    };
  }
}
