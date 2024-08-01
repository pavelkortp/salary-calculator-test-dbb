import { SalaryCalculatorStrategy } from '../base/salary.calculator.strategy';
import { StaffMember } from '../base/entities/staff-member';
import {
  EMPLOYEE_MAX_SALARY_INCREASE,
  EMPLOYEE_YEAR_SALARY_INCREASE,
} from '../base/constants';

export class EmployeeSalaryCalculatorStrategy
  implements SalaryCalculatorStrategy
{
  public static calculateSalary(sm: StaffMember, date: Date): number {
    const years = date.getFullYear() - sm.joinDate.getFullYear();
    const baseSalaryIncrease = Math.min(
      EMPLOYEE_YEAR_SALARY_INCREASE * years,
      EMPLOYEE_MAX_SALARY_INCREASE,
    );

    return sm.baseSalary * (baseSalaryIncrease + 1);
  }
}
