import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Employee} from '../../entity/employee/employee';
import {Observable} from 'rxjs';
import {Division} from '../../entity/employee/division';

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {
  URL_EMPLOYEE = 'http://localhost:8080/api/employees';
  constructor(private httpClient: HttpClient) { }

  saveEmployee(employee: Employee): Observable<Employee> {
    return this.httpClient.post<Employee>(this.URL_EMPLOYEE, employee);
  }

  findById(id: number ): Observable<Employee> {
    return this.httpClient.get<Employee>(`${(this.URL_EMPLOYEE)}/${id}`);
  }

  updateCustomer(employee: Employee): Observable<Employee> {
    return this.httpClient.patch<Employee>(`${(this.URL_EMPLOYEE)}/${employee.idEmployee}`, employee);
  }
}
