import { SalaryCalculatorStrategy } from '../base/salary.calculator.strategy';
import { StaffMember } from '../base/entities/staff-member';
import { StaffTypes } from '../base/constants';
import { EmployeeSalaryCalculatorStrategy } from '../employee/employee.salary.calculator.strategy';
import { ManagerSalaryCalculatorStrategy } from '../manager/manager.salary.calculator.strategy';
import { SalesSalaryCalculatorStrategy } from '../sales/sales.salary.calculator.strategy';

export class SalaryCalculator extends SalaryCalculatorStrategy {
  public static calculateSalary(sm: StaffMember, date: Date): number {
    switch (sm.position) {
      case StaffTypes.EMPLOYEE:
        return EmployeeSalaryCalculatorStrategy.calculateSalary(sm, date);
      case StaffTypes.MANAGER:
        return ManagerSalaryCalculatorStrategy.calculateSalary(sm, date);
      case StaffTypes.SALES:
        return SalesSalaryCalculatorStrategy.calculateSalary(sm, date);
    }
  }
}
