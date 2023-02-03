import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Employee} from '../../entity/employee/employee';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {
  URL_EMPLOYEE = 'http://localhost:8080/api/employees';
  constructor(private httpClient: HttpClient) { }

  /**
   * Create bt: LongPT
   * Date created: 03/02/2023
   * Function: save employee in data
   */
  saveEmployee(employee: Employee): Observable<Employee> {
    return this.httpClient.post<Employee>(this.URL_EMPLOYEE, employee);
  }

  /**
   * Create bt: LongPT
   * Date created: 03/02/2023
   * Function: get employee by id
   * @param id: number
   */
  findById(id: number ): Observable<Employee> {
    return this.httpClient.get<Employee>(`${(this.URL_EMPLOYEE)}/${id}`);
  }

  /**
   * Create bt: LongPT
   * Date created: 03/02/2023
   * Function: update employee
   * @param employee: any
   */
  updateCustomer(employee: Employee): Observable<Employee> {
    return this.httpClient.patch<Employee>(`${(this.URL_EMPLOYEE)}/${employee.idEmployee}`, employee);
  }
}
