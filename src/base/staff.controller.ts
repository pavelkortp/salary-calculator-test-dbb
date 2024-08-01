import { Body, Controller, Post, ValidationPipe } from '@nestjs/common';
import { StaffService } from './staff.service';
import { CreateStaffDto } from './dto/create-staff.dto';
import { StaffTypes } from './constants';

@Controller()
export class StaffController {
  constructor(private service: StaffService) {}
}
