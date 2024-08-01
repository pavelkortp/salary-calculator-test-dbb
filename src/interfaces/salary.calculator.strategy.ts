import { StaffMember } from '../base/entities/staff-member';

export abstract class SalaryCalculatorStrategy {
  /**
   * Calculates salary for staff member.
   * @param sm staff member.
   * @param date settlement date.
   */
  public static calculateSalary(sm: StaffMember, date: Date): number {
    return 0;
  }
}
