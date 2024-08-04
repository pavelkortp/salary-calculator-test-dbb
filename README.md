# API Endpoints

| Staff Type | Method | URI                                | Body                                                                               | Response                                                                                                                                                                                                                                                                                       |
|------------|--------|------------------------------------|------------------------------------------------------------------------------------|------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| Employee   | `POST` | `/employees`                       | ```json { "name": "John Doe", "joinDate": "2020-01-01", "baseSalary": 1000 } ```   | The created `Employee` object    ```json { "id":1, "name": "John Doe", "joinDate": "2020-01-01", "baseSalary": 1000, "position": "employee" } ```                                                                                                                                              |
| Employee   | `GET`  | `/employees/:id`                   | None                                                                               | The `Employee` object    ```json { "id":1, "name": "John Doe", "joinDate": "2020-01-01", "baseSalary": 1000, "position": "employee" } ```                                                                                                                                                      |
| Employee   | `GET`  | `/employees/:id/salary`            | ```json {"date": "2024-01-01"}```                                                  | ```json { "salary":1120 } ```                                                                                                                                                                                                                                                                  |
| Manager    | `POST` | `/managers`                        | ```json { "name": "Jane Smith", "joinDate": "2018-01-01", "baseSalary": 1000 } ``` | The created `Manager` object     ```json { "id":2, "name": "Jane Smith", "joinDate": "2018-01-01", "baseSalary": 1000, "position": "manager" } ```                                                                                                                                             |
| Manager    | `GET`  | `/managers/:id`                    | None                                                                               | The `Manager` object  ```json { "id":2, "name": "Jane Smith", "joinDate": "2018-01-01", "baseSalary": 1000, "position": "manager" } ```                                                                                                                                                        |
| Manager    | `POST` | `/managers/:managerId/subordinate` | ```json { "subordinateId": 1 } ```                                                 | The updated `Manager` object with the new subordinate ```json { "id":2, "name": "Jane Smith", "joinDate": "2018-01-01", "baseSalary": 1000, "position": "manager", "subordinates":[{ "id":1, "name": "John Doe", "joinDate": "2020-01-01", "baseSalary": 1000, "position": "employee" }] } ``` |
| Manager    | `GET`  | `/managers/:id/salary`             | ```json { "date": "2024-01-01" } ```                                               | ```json { "salary": 1125,6 } ```                                                                                                                                                                                                                                                               |
| Sales      | `POST` | `/sales`                           | ```json { "name": "Jane Smith", "joinDate": "2018-01-01", "baseSalary": 1000 } ``` | The created `Sales` object     ```json { "id":3, "name": "Jane Smith", "joinDate": "2018-01-01", "baseSalary": 1000, "position": "sales" } ```                                                                                                                                                 |
| Sales      | `GET`  | `/sales/:id`                       | None                                                                               | The `Sales` object  ```json { "id":2, "name": "Jane Smith", "joinDate": "2018-01-01", "baseSalary": 1000, "position": "sales" } ```                                                                                                                                                            |
| Sales      | `POST` | `/sales/:salesId/subordinate`      | ```json { "subordinateId": 1 } ```                                                 | The updated `Sales` object with the new subordinate ```json { "id":2, "name": "Jane Smith", "joinDate": "2018-01-01", "baseSalary": 1000, "position": "sales", "subordinates":[{ "id":1, "name": "John Doe", "joinDate": "2020-01-01", "baseSalary": 1000, "position": "employee" }] } ```     |
| Sales      | `GET`  | `/sales/:id/salary`                | ```json { "date": "2024-01-01" } ```                                               | ```json { "salary": 1125,6 } ```                                                                                                                                                                                                                                                               |
| None       | `GET`  | `/staff/salary`                    | ```json { "date": "2024-01-01" } ```                                               | ```json { "totalSalary": 1125,6 } ```                                                                                                                                                                                                                                                          |

## Schemas
### StaffMember
- `id`: Primary key auto-generated unique ID for each staff member.
- `name`: Name of the staff member.
- `joinDate`: Date of starting work in the company.
- `position`: Staff position: employee, manager or sales.
- `subordinates`: Many-to-many relationship with StaffMember (Staff members with `position` 'manager' or 'sales' can have subordinates).

# How to run?

## Before setting up the project, ensure you have the following installed on your system:

- **[Node.js](https://nodejs.org/en)** (version 14.x or higher)
- **[npm](https://www.npmjs.com/)** (Node Package Manager, which comes with Node.js)
- **[SQLite](https://www.sqlite.org/)** (if using SQLite as the database)

## Installation

**Clone the repository**:
   ```bash
   git clone https://github.com/pavelkortp/salary-calculator-test-dbb.git
   cd salary-calculator-test-dbb
```
**Run to install dependencies**:
```bash
$ npm install
```

## Running the app
```bash
# App by default launch on 3000 port
$ npm run start
```

## Test

```bash
# unit tests
$ npm run test
```
