import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Employee} from '../entity/employee/employee';

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {

  URL_EMPLOYEE = 'http://localhost:8080/api/employees';

  constructor(private httpClient: HttpClient) {
  }

  getAllEmployee(pageable: any): Observable<Employee[]> {
    return this.httpClient.get<Employee[]>(this.URL_EMPLOYEE + '/employee-list?page=' + pageable);
  }

  deleteEmployee(id: number | undefined): Observable<Employee> {
    return this.httpClient.delete<Employee>(this.URL_EMPLOYEE + '/' + id);
  }

  searchEmployee(codeEmployeeSearch: any,
                 nameEmployeeSearch: any,
                 emailEmployeeSearch: any,
                 divisionSearch: any,
                 pageable: any): Observable<any> {
    return this.httpClient.get<any>(this.URL_EMPLOYEE +
      '/employee-list?codeSearch=' + codeEmployeeSearch +
      '&nameSearch=' + nameEmployeeSearch +
      '&emailSearch=' + emailEmployeeSearch +
      '&nameDivisionSearch=' + divisionSearch +
      '&pageable=' + pageable);
  }
}
