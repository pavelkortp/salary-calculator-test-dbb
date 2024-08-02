import { StaffMember } from './entities/staff-member';

export abstract class SalaryCalculatorStrategy {
  /**
   * Calculates salary for staff member on a given date.
   * @param sm staff member.
   * @param date settlement date.
   * @return calculated salary
   */
  public static calculateSalary(sm: StaffMember, date: Date): number {
    return 0;
  }
}
