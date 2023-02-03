import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {Router} from '@angular/router';
import {Employee} from '../../entity/employee/employee';
import {Division} from '../../entity/employee/division';
import {EmployeeService} from '../../service/employee.service';
import {DivisionService} from '../../service/division.service';
import {NotificationService} from '../../service/notification.service';
import {EmployeeInfo} from '../../dto/employee-info';

@Component({
  selector: 'app-employee-list',
  templateUrl: './employee-list.component.html',
  styleUrls: ['./employee-list.component.css']
})
export class EmployeeListComponent implements OnInit {
  employees: EmployeeInfo[] = [];
  divisions: Division[] = [];
  temp: Employee = {};
  codeEmployeeSearch = '';
  nameEmployeeSearch = '';
  emailEmployeeSearch = '';
  divisionSearch = '';
  request = {page: 0, size: 5};
  pageNumber = 0;
  totalPages = 0;

  constructor(private employeeService: EmployeeService,
              private divisionService: DivisionService,
              private route: Router,
              private notificationService: NotificationService) {
    this.getAllDivisionListComponent();
  }

  /**
   * Create by: NhanUQ
   * Date created: 03/02/2023
   * Function: get list division from BE
   * @return division[] if success
   */
  private getAllDivisionListComponent(): void {
    this.divisionService.getAllDivision().subscribe(data => {
      this.divisions = data;
    });
  }

  /**
   * Create by: NhanUQ
   * Date created: 03/02/2023
   * Function: get list employee from BE
   * @param request: {page, size}
   * @return employee[] if success
   */
  private getAllEmployeeListComponent(request: { page?: any; size?: any; } | undefined): void {
    this.codeEmployeeSearch = '';
    this.nameEmployeeSearch = '';
    this.emailEmployeeSearch = '';
    this.divisionSearch = '';
    this.employeeService.getAllEmployee(request).subscribe(data => {
      console.log(data);
      // @ts-ignore
      this.employees = data.content;
      // @ts-ignore
      this.totalPages = data.totalPages;
      // @ts-ignore
      this.pageNumber = data.pageable.pageNumber;
    }, error => {
    }, () => {
    });
  }

  ngOnInit(): void {
    this.searchEmployee(this.codeEmployeeSearch, this.nameEmployeeSearch, this.emailEmployeeSearch, this.divisionSearch);
  }

  /**
   * Create by: NhanUQ
   * Date created: 03/02/2023
   * Function: reload page list after delete
   */
  reload(): void {
    this.getAllEmployeeListComponent(this.request);
  }

  /**
   * Create by: NhanUQ
   * Date created: 03/02/2023
   * Function: navigation to page edit with id employee
   * @param idEmployee : number
   */
  editEmployee(idEmployee: number | undefined): void {
    this.route.navigate(['/employee/edit', idEmployee]).then(r => {
      console.log(r);
    });
  }

  /**
   * Create by: NhanUQ
   * Date created: 03/02/2023
   * Function: search employee with parameter from list html
   * @param codeEmployeeSearch: string,
   * @param nameEmployeeSearch: string,
   * @param emailEmployeeSearch: string,
   * @param divisionSearch: string
   */
  searchEmployee(codeEmployeeSearch: string,
                 nameEmployeeSearch: string,
                 emailEmployeeSearch: string,
                 divisionSearch: string): void {

    codeEmployeeSearch =
      codeEmployeeSearch === '' ||
      codeEmployeeSearch === ' ' ||
      codeEmployeeSearch === undefined ||
      codeEmployeeSearch == null ? '' : codeEmployeeSearch;

    nameEmployeeSearch =
      nameEmployeeSearch === '' ||
      nameEmployeeSearch === ' ' ||
      nameEmployeeSearch === undefined ||
      nameEmployeeSearch == null ? '' : nameEmployeeSearch;

    emailEmployeeSearch =
      emailEmployeeSearch === '' ||
      emailEmployeeSearch === ' ' ||
      emailEmployeeSearch === undefined ||
      emailEmployeeSearch == null ? '' : emailEmployeeSearch;

    divisionSearch =
      divisionSearch === '' ||
      divisionSearch === ' ' ||
      divisionSearch === undefined ||
      divisionSearch == null ? '' : divisionSearch;

    this.searchEmployeeListComponent(codeEmployeeSearch, nameEmployeeSearch, emailEmployeeSearch, divisionSearch, this.request);

  }

  /**
   * Create by: NhanUQ
   * Date created: 03/02/2023
   * Function: get list search employee from BE
   * @param codeEmployeeSearch: string,
   * @param nameEmployeeSearch: string,
   * @param emailEmployeeSearch: string,
   * @param divisionSearch: string
   * @param request: {page, size}
   * @return list search employee if success or message if error
   */
  private searchEmployeeListComponent(
    codeEmployeeSearch: string,
    nameEmployeeSearch: string,
    emailEmployeeSearch: string,
    divisionSearch: string,
    request: { page?: any; size?: any; } | undefined): void {
    this.employeeService.searchEmployee(
      codeEmployeeSearch.trim(),
      nameEmployeeSearch.trim(),
      emailEmployeeSearch.trim(),
      divisionSearch.trim(),
      request).subscribe(data => {
      console.log(data);
      // @ts-ignore
      this.employees = data.content;
      // @ts-ignore
      this.totalPages = data.totalPages;
      // @ts-ignore
      this.pageNumber = data.pageable.pageNumber;
      console.log(this.pageNumber);
    }, error => {
      this.showToastrError();
    });
  }

  /**
   * Create by: NhanUQ
   * Date created: 03/02/2023
   * Function: change page pagination
   * @param codeEmployeeSearch: string,
   * @param nameEmployeeSearch: string,
   * @param emailEmployeeSearch: string,
   * @param divisionSearch: string
   * @param pageNumber: number
   */
  changePage(codeEmployeeSearch: string,
             nameEmployeeSearch: string,
             emailEmployeeSearch: string,
             divisionSearch: string,
             pageNumber: number): void {
    this.request.page = pageNumber;
    this.searchEmployee(codeEmployeeSearch, nameEmployeeSearch, emailEmployeeSearch, divisionSearch);
  }

  /**
   * Create by: NhanUQ
   * Date created: 03/02/2023
   * Function: show message toastr when search error
   */
  private showToastrError(): void {
    this.notificationService.showError('Không có kết quả cần tìm');
  }
}

