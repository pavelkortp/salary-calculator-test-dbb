export enum StaffTypes {
  EMPLOYEE = 'employee',
  MANAGER = 'manager',
  SALES = 'sales',
}

//Employees
export const EMPLOYEE_MAX_SALARY_INCREASE: number = 0.3;
export const EMPLOYEE_YEAR_SALARY_INCREASE: number = 0.03;

//Managers
export const MANAGER_MAX_SALARY_INCREASE: number = 0.4;
export const MANAGER_YEAR_SALARY_INCREASE: number = 0.05;
export const MANAGER_SUBORDINATES_SALARY_INCREASE: number = 0.005;

//Sales
export const SALES_MAX_SALARY_INCREASE: number = 0.35;
export const SALES_YEAR_SALARY_INCREASE: number = 0.01;
export const SALES_SUBORDINATES_SALARY_INCREASE: number = 0.003;
