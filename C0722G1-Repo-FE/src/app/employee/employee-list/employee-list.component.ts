import {Employee} from '../../entity/employee/employee';
import {Division} from '../../entity/employee/division';
import {EmployeeService} from '../../service/employee.service';
import {DivisionService} from '../../service/division.service';
import {EmployeeInfoJson} from '../../dto/employee/employee-info-json';
import {EmployeeInfo} from '../../dto/employee/employee-info';
import {Title} from '@angular/platform-browser';
import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';

@Component({
  selector: 'app-employee-list',
  templateUrl: './employee-list.component.html',
  styleUrls: ['./employee-list.component.css']
})
export class EmployeeListComponent implements OnInit {
  employeeInfo: EmployeeInfo[] = [];
  employeeList!: EmployeeInfoJson;
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
              private titleService: Title) {
    this.titleService.setTitle('Danh sách nhân viên');
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
      this.employeeList = data;
      this.employeeInfo = data.content;
      console.log(this.employeeInfo);
      // @ts-ignore
      this.totalPages = data.totalPages;
      // @ts-ignore
      this.pageNumber = data.pageable.pageNumber;
    }, error => {
    }, () => {
    });
  }

  ngOnInit(): void {
    this.searchEmployee(this.codeEmployeeSearch, this.nameEmployeeSearch, this.emailEmployeeSearch, this.divisionSearch, true);
  }

  /**
   * Create by: NhanUQ
   * Date created: 03/02/2023
   * Function: reload page list after delete
   */
  reload(): void {
    this.codeEmployeeSearch = '';
    this.nameEmployeeSearch = '';
    this.emailEmployeeSearch = '';
    this.divisionSearch = '';
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
    });
  }

  /**
   * Create by: NhanUQ
   * Date created: 03/02/2023
   * Function: show message toastr when search error
   */
  private showToastrError(): void {
    this.employeeService.showError('Không có kết quả cần tìm', 'Thông báo!');
  }

  /**
   * Create by: NhanUQ
   * Date created: 03/02/2023
   * Function: show message toastr when search success
   */
  private showToastrSuccess(): void {
    this.employeeService.showSuccess('Tìm kiếm thành công', 'Thông báo!');
  }

  /**
   * Create by: NhanUQ
   * Date created: 03/02/2023
   * Function: search employee
   * @param codeEmployeeSearch: string,
   * @param nameEmployeeSearch: string,
   * @param emailEmployeeSearch: string,
   * @param divisionSearch: string
   * @param flag: boolean
   */
  searchEmployee(codeEmployeeSearch: string, nameEmployeeSearch: string, emailEmployeeSearch: string, divisionSearch: string, flag: boolean) {
    if (!flag) {
      this.request.page = 0;
    }
    this.codeEmployeeSearch = codeEmployeeSearch;
    this.nameEmployeeSearch = nameEmployeeSearch;
    this.emailEmployeeSearch = emailEmployeeSearch;
    this.divisionSearch = divisionSearch;
    this.employeeService.searchEmployee(
      codeEmployeeSearch.trim(),
      nameEmployeeSearch.trim(),
      emailEmployeeSearch.trim(),
      divisionSearch.trim(),
      this.request).subscribe(data => {
      this.employeeList = data;
      this.employeeInfo = data.content;
      console.log(this.employeeInfo);
      // @ts-ignore
      this.totalPages = data.totalPages;
      // @ts-ignore
      this.pageNumber = data.pageable.pageNumber;
      if ((codeEmployeeSearch !== '' || nameEmployeeSearch !== '' || emailEmployeeSearch !== '' || divisionSearch !== '') && !flag) {
        this.showToastrSuccess();
      }
    }, error => {
      this.codeEmployeeSearch = '';
      this.nameEmployeeSearch = '';
      this.emailEmployeeSearch = '';
      this.divisionSearch = '';
      this.getAllEmployeeListComponent(this.request);
      flag = true;
      if (error.status === 404) {
        this.showToastrError();
      }
    }, () => {
    });
  }

  /**
   * Create by: NhanUQ
   * Date created: 03/02/2023
   * Function: change page pagination
   * @param pageNumber: number
   */
  changePage(pageNumber: number) {
    this.request.page = pageNumber;
    this.ngOnInit();
  }
}
