import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Employee} from '../entity/employee/employee';
import {EmployeeInfo} from '../dto/employee/employee-info';
import {EmployeeInfoJson} from '../dto/employee/employee-info-json';
import {ToastrService} from 'ngx-toastr';
import {CustomerDtoEmailAndUsername} from "../dto/customer/customerDtoEmailAndUsername";

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {

  URL_EMPLOYEE = 'http://localhost:8080/api/employees';
  URL_EMPLOYEE_CREATE = 'http://localhost:8080/api/employees/save';
  URL_EMPLOYEE_UPDATE = 'http://localhost:8080/api/employees/update';
  URL_ACCOUNT ='http://localhost:8080/api/public/ListMailCustomerAnhNameAccount';

  constructor(private httpClient: HttpClient,
              private toast: ToastrService) {
  }

  /**
   * Create by: NhanUQ
   * Date created: 03/02/2023
   * Function: get list employee from BE
   * @param request: any
   * @return Observable EmployeeInfo[]
   */
  // getAllEmployee(request: any): Observable<EmployeeInfo[]> {
  //   const params = request;
  //   return this.httpClient.get<EmployeeInfo[]>(this.URL_EMPLOYEE + '/employee-list', {params});
  // }
  getAllEmployee(request: any): Observable<any> {
    const params = request;
    return this.httpClient.get<any>(this.URL_EMPLOYEE + '/employee-list', {params});
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
  // searchEmployee(codeEmployeeSearch: any,
  //                nameEmployeeSearch: any,
  //                emailEmployeeSearch: any,
  //                divisionSearch: any,
  //                request: any): Observable<EmployeeInfo[]> {
  //   const params = request;
  //   const url = this.URL_EMPLOYEE +
  //     '/employee-list?codeSearch=' + codeEmployeeSearch +
  //     '&nameSearch=' + nameEmployeeSearch +
  //     '&emailSearch=' + emailEmployeeSearch +
  //     '&nameDivisionSearch=' + divisionSearch;
  //   return this.httpClient.get<EmployeeInfo[]>(url, {params});
  // }
  searchEmployee(codeEmployeeSearch: any,
                 nameEmployeeSearch: any,
                 emailEmployeeSearch: any,
                 divisionSearch: any,
                 request: any): Observable<any> {
    const params = request;
    const url = this.URL_EMPLOYEE +
      '/employee-list?codeSearch=' + codeEmployeeSearch +
      '&nameSearch=' + nameEmployeeSearch +
      '&emailSearch=' + emailEmployeeSearch +
      '&nameDivisionSearch=' + divisionSearch;
    return this.httpClient.get<any>(url, {params});
  }

  /**
   * Create bt: LongPT
   * Date created: 03/02/2023
   * Function: save employee in data
   */
  saveEmployee(employee: Employee): Observable<Employee> {
    return this.httpClient.post<Employee>(this.URL_EMPLOYEE_CREATE, employee);
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
  updateEmployee(employee: Employee): Observable<Employee> {
    return this.httpClient.patch<Employee>(`${(this.URL_EMPLOYEE_UPDATE)}/${employee.idEmployee}`, employee);
  }

  /**
   * Created: NhanUQ
   * Function: notification success
   * @Param message
   * Date: 03/02/2023
   */
  showSuccess(message: string, title: string): void {
    this.toast.success(message, title);
  }

  /**
   * Created: NhanUQ
   * Function: notification error
   * @Param message
   * Date: 03/02/2023
   */
  showError(message: string, title: string): void {
    this.toast.error(message, title);
  }

  /**
   * creator: LongPt
   * date:31/01/2023
   * method get username for check account
   */
  findListMail(): Observable<CustomerDtoEmailAndUsername[]> {
    return this.httpClient.get<CustomerDtoEmailAndUsername[]>(this.URL_ACCOUNT);
  }
}








