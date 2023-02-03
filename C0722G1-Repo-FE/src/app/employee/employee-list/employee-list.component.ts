import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {Employee} from '../../entity/employee/employee';
import {Division} from '../../entity/employee/division';
import {EmployeeService} from '../../service/employee.service';
import {DivisionService} from '../../service/division.service';

@Component({
  selector: 'app-employee-list',
  templateUrl: './employee-list.component.html',
  styleUrls: ['./employee-list.component.css']
})
export class EmployeeListComponent implements OnInit {

  employees: Employee[] = [];
  divisions: Division[] = [];
  temp: Employee = {};
  codeEmployeeSearch = '';
  nameEmployeeSearch = '';
  emailEmployeeSearch = '';
  divisionSearch = '';
  pageable: any;
  constructor(private employeeService: EmployeeService,
              private divisionService: DivisionService,
              private route: Router) {
    this.getAllEmployeeListComponent(this.pageable);

    this.divisionService.getAllDivision().subscribe(data => {
      this.divisions = data;
    });
  }
  private getAllEmployeeListComponent(pageable: any): void {
    this.codeEmployeeSearch = '';
    this.nameEmployeeSearch = '';
    this.emailEmployeeSearch = '';
    this.divisionSearch = '';
    this.employeeService.getAllEmployee(pageable).subscribe(data => {
      console.log(data);
      // @ts-ignore
      this.employees = data.content;
      // @ts-ignore
      this.pageable = data.pageable;
      console.log(this.employees);
      console.log(this.pageable);
    }, error => {
    }, () => {
    });
  }

  ngOnInit(): void {
  }

  reload(): void {
    console.log(this.pageable);
    this.getAllEmployeeListComponent(this.pageable);
  }

  editEmployee(idEmployee: number | undefined): void {
    this.route.navigate(['/employee/edit', idEmployee]).then(r => {
      console.log(r); });
  }

  searchEmployee(codeEmployeeSearch: string,
                 nameEmployeeSearch: string,
                 emailEmployeeSearch: string,
                 divisionSearch: string): void {
    this.employeeService.searchEmployee(
      codeEmployeeSearch,
      nameEmployeeSearch,
      emailEmployeeSearch,
      divisionSearch,
      this.pageable).subscribe(data => {
      if (codeEmployeeSearch === '' && nameEmployeeSearch === '' && emailEmployeeSearch === '' && divisionSearch === '') {
        this.getAllEmployeeListComponent(this.pageable);
      } else {
        console.log(data);
        this.employees = data;
        this.pageable = data;
      }
    });
  }
}

