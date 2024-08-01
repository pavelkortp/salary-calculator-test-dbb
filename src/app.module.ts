import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { SalesModule } from './sales/sales.module';
import { ManagerModule } from './manager/manager.module';
import { dataSourceOptions } from './db/db-config';
import { EmployeeModule } from './employee/employee.module';

@Module({
  imports: [
    EmployeeModule,
    SalesModule,
    ManagerModule,
    TypeOrmModule.forRoot(dataSourceOptions),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
