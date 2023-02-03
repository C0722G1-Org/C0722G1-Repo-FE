import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {Employee} from '../../entity/employee/employee';
import {Division} from '../../entity/employee/division';
import {EmployeeService} from '../../service/employee/employee.service';
import {DivisionService} from '../../service/employee/division.service';
import {Router} from '@angular/router';
import {ToastrService} from 'ngx-toastr';

@Component({
  selector: 'app-employee-edit',
  templateUrl: './employee-edit.component.html',
  styleUrls: ['./employee-edit.component.css']
})
export class EmployeeEditComponent implements OnInit {
  employee: Employee = {};
  divisions: Division[] = [];
  formUpdateEmployee: FormGroup = new FormGroup({});

  constructor(private employeeService: EmployeeService,
              private divisionService: DivisionService,
              private router: Router,
              private toastrService: ToastrService) {
    this.formUpdateEmployee = new FormGroup({
      idEmployee: new FormControl(this.employee.idEmployee),
      codeEmployee: new FormControl(this.employee.codeEmployee, [Validators.required, Validators.pattern('^NV-[0-9]{4}$')]),
      nameEmployee: new FormControl(this.employee.nameEmployee, [Validators.required, Validators.pattern('^[AÀẢÃÁẠĂẰẲẴẮẶÂẦẨẪẤẬBCDĐEÈẺẼÉẸÊỀỂỄẾỆFGHIÌỈĨÍỊJKLMNOÒỎÕÓỌÔỒỔỖỐỘƠỜỞỠỚỢPQRSTUÙỦŨÚỤƯỪỬỮỨỰVWXYỲỶỸÝỴZ][aàảãáạăằẳẵắặâầẩẫấậbcdđeèẻẽéẹêềểễếệfghiìỉĩíịjklmnoòỏõóọôồổỗốộơờởỡớợpqrstuùủũúụưừửữứựvwxyỳỷỹýỵz]+ [AÀẢÃÁẠĂẰẲẴẮẶÂẦẨẪẤẬBCDĐEÈẺẼÉẸÊỀỂỄẾỆFGHIÌỈĨÍỊJKLMNOÒỎÕÓỌÔỒỔỖỐỘƠỜỞỠỚỢPQRSTUÙỦŨÚỤƯỪỬỮỨỰVWXYỲỶỸÝỴZ][aàảãáạăằẳẵắặâầẩẫấậbcdđeèẻẽéẹêềểễếệfghiìỉĩíịjklmnoòỏõóọôồổỗốộơờởỡớợpqrstuùủũúụưừửữứựvwxyỳỷỹýỵz]+(?: [AÀẢÃÁẠĂẰẲẴẮẶÂẦẨẪẤẬBCDĐEÈẺẼÉẸÊỀỂỄẾỆFGHIÌỈĨÍỊJKLMNOÒỎÕÓỌÔỒỔỖỐỘƠỜỞỠỚỢPQRSTUÙỦŨÚỤƯỪỬỮỨỰVWXYỲỶỸÝỴZ][aàảãáạăằẳẵắặâầẩẫấậbcdđeèẻẽéẹêềểễếệfghiìỉĩíịjklmnoòỏõóọôồổỗốộơờởỡớợpqrstuùủũúụưừửữứựvwxyỳỷỹýỵz]*)*$')]),
      phoneEmployee: new FormControl(this.employee.phoneEmployee, [Validators.required, Validators.pattern('^(((\\+|)84)|0)(3|5|7|8|9)+([0-9]{8})$')]),
      emailEmployee: new FormControl(this.employee.emailEmployee, [Validators.required, Validators.email]),
      addressEmployee: new FormControl(this.employee.addressEmployee, Validators.required),
      genderEmployee: new FormControl(this.employee.genderEmployee, Validators.required),
      dateOfBirth: new FormControl(this.employee.dateOfBirth, Validators.required),
      division: new FormGroup({
        idDivision: new FormControl(),
        nameDivision: new FormControl()
      }),
      flagDeleted: new FormControl(this.employee.flagDeleted),
      // account: new FormControl('', Validators.required)
    });
  }

  compareCate(item1: Employee, item2: Employee): boolean {
    return item1 && item2 ? item1.idEmployee === item2.idEmployee : item1 === item2;
  }

  ngOnInit(): void {
    this.getAllDivision();
  }

  getEmployee(id: number): void {
    this.employeeService.findById(id).subscribe(data => {
      this.formUpdateEmployee.patchValue(data);
      this.employee = data;
    });
  }

  getAllDivision(): void {
    this.divisionService.getAllDivision().subscribe(data => {
      this.divisions = data;
    }, error => {
      console.log(error);
    });
  }

  updateEmployee(): void {
    this.employeeService.updateCustomer(this.formUpdateEmployee.value).subscribe(data => {
      if (data != null) {
        this.toastrService.error('Chỉnh sủa không thành công.', 'Cảnh báo');
      } else {
        this.toastrService.success('Chỉnh sửa thành công!', 'Thông báo');
        this.router.navigateByUrl('/employee');
      }
    }, error => {
      console.log(error);
    });
  }

}
