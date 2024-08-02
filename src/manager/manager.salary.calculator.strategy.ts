import { SalaryCalculatorStrategy } from '../interfaces/salary.calculator.strategy';
import { StaffMember } from '../base/entities/staff-member';
import {
  MANAGER_MAX_SALARY_INCREASE,
  MANAGER_SUBORDINATES_SALARY_INCREASE,
  MANAGER_YEAR_SALARY_INCREASE,
} from '../base/constants';
import { SalaryCalculator } from '../base/salary.calculator';

export class ManagerSalaryCalculatorStrategy implements SalaryCalculatorStrategy {
  static calculateSalary(sm: StaffMember, date: Date): number {
    const years = date.getFullYear() - sm.joinDate.getFullYear();
    const baseSalaryIncrease = Math.min(
      MANAGER_YEAR_SALARY_INCREASE * years,
      MANAGER_MAX_SALARY_INCREASE,
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
