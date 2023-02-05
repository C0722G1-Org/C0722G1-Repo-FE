import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Employee} from '../entity/employee/employee';
import {EmployeeInfo} from '../dto/employee-info';

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {

  URL_EMPLOYEE = 'http://localhost:8080/api/employees';

  constructor(private httpClient: HttpClient) {
  }

  /**
   * Create by: NhanUQ
   * Date created: 03/02/2023
   * Function: get list employee from BE
   * @param request: any
   * @return Observable EmployeeInfo[]
   */
  getAllEmployee(request: any): Observable<EmployeeInfo[]> {
    const params = request;
    return this.httpClient.get<EmployeeInfo[]>(this.URL_EMPLOYEE + '/employee-list', {params});
  }

  /**
   * Create by: NhanUQ
   * Date created: 03/02/2023
   * Function: delete employee from BE
   * @param id: number
   * @return Observable employee
   */
  deleteEmployee(id: number | undefined): Observable<Employee> {
    return this.httpClient.delete<Employee>(this.URL_EMPLOYEE + '/' + id);
  }

  /**
   * Create by: NhanUQ
   * Date created: 03/02/2023
   * Function: get list search employee from BE
   * @param codeEmployeeSearch: any
   * @param nameEmployeeSearch: any
   * @param emailEmployeeSearch: any
   * @param divisionSearch: any
   * @param request: any
   * @return Observable EmployeeInfo[]
   */
  searchEmployee(codeEmployeeSearch: any,
                 nameEmployeeSearch: any,
                 emailEmployeeSearch: any,
                 divisionSearch: any,
                 request: any): Observable<EmployeeInfo[]> {
    const params = request;
    const url = this.URL_EMPLOYEE +
      '/employee-list?codeSearch=' + codeEmployeeSearch +
      '&nameSearch=' + nameEmployeeSearch +
      '&emailSearch=' + emailEmployeeSearch +
      '&nameDivisionSearch=' + divisionSearch;
    console.log(url);
    return this.httpClient.get<EmployeeInfo[]>(url, {params});
  }

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
