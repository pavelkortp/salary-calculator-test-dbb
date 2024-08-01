import { SalaryCalculatorStrategy } from '../interfaces/salary.calculator.strategy';
import { StaffMember } from '../base/entities/staff-member';
import {
  MANAGER_SUBORDINATES_SALARY_INCREASE,
  SALES_MAX_SALARY_INCREASE,
  SALES_YEAR_SALARY_INCREASE,
} from '../base/constants';
import { SalaryCalculator } from '../interfaces/salary.calculator';

export class ManagerSalaryCalculatorStrategy extends SalaryCalculatorStrategy {
  static calculateSalary(sm: StaffMember, date: Date): number {
    const years = date.getFullYear() - sm.joinDate.getFullYear();
    const baseSalaryIncrease = Math.min(
      SALES_YEAR_SALARY_INCREASE * years,
      SALES_MAX_SALARY_INCREASE,
    );
    const additionalSalary =
      this.calculateSubordinatesSalary(sm, date) *
      MANAGER_SUBORDINATES_SALARY_INCREASE;

    return sm.baseSalary * (baseSalaryIncrease + 1) + additionalSalary;
  }

  /**
   * Calculates the salary only of direct subordinates. (for Managers)
   * @param sm
   * @param date settlement date
   * @private
   * @return sum of salaries of each direct subordinate.
   */
  private static calculateSubordinatesSalary(
    sm: StaffMember,
    date: Date,
  ): number {
    const res: number = sm.subordinates?.reduce(
      (sum: number, curr: StaffMember) =>
        sum + SalaryCalculator.calculateSalary(curr, date),
      0,
    );
    return res ? res : 0;
  }
}