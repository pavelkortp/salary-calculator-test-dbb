import { SalaryCalculatorStrategy } from '../base/salary.calculator.strategy';
import { StaffMember } from '../base/entities/staff-member';
import {
  SALES_MAX_SALARY_INCREASE,
  SALES_SUBORDINATES_SALARY_INCREASE,
  SALES_YEAR_SALARY_INCREASE,
} from '../base/constants';
import { SalaryCalculator } from '../interfaces/salary.calculator';

export class SalesSalaryCalculatorStrategy implements SalaryCalculatorStrategy {
  public static calculateSalary(sm: StaffMember, date: Date): number {
    const years = date.getFullYear() - sm.joinDate.getFullYear();
    const baseSalaryIncrease = Math.min(
      SALES_YEAR_SALARY_INCREASE * years,
      SALES_MAX_SALARY_INCREASE,
    );
    const additionalSalary =
      this.calculateAllSubordinatesSalary(sm, date) *
      SALES_SUBORDINATES_SALARY_INCREASE;

    return sm.baseSalary * (baseSalaryIncrease + 1) + additionalSalary;
  }

  /**
   * Calculates the sum of any level subordinates salaries
   * @param sm
   * @param date settlement date
   * @private
   * @return sum of salaries of each subordinate.
   */
  private static calculateAllSubordinatesSalary(
    sm: StaffMember,
    date: Date,
  ): number {
    const queue: StaffMember[] = [...sm.subordinates];
    let totalSalary = 0;

    while (queue.length > 0) {
      const current = queue.shift();
      totalSalary += SalaryCalculator.calculateSalary(sm, date);
      queue.push(...current.subordinates);
    }

    return totalSalary;
  }
}
