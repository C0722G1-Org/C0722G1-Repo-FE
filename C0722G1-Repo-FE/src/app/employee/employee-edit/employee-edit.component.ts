import {Component, OnInit} from '@angular/core';
import {Employee} from '../../entity/employee/employee';
import {Division} from '../../entity/employee/division';
import {AbstractControl, FormControl, FormGroup, ValidationErrors, ValidatorFn, Validators} from '@angular/forms';
import {ActivatedRoute, Router} from '@angular/router';
import {ToastrService} from 'ngx-toastr';
import {EmployeeService} from '../../service/employee.service';
import {DivisionService} from '../../service/division.service';
import {Title} from "@angular/platform-browser";

export const checkBirthDay: ValidatorFn = (control: AbstractControl): ValidationErrors | null => {
  // @ts-ignore
  const birthday = new Date(control.get('dateOfBirth').value).getTime();
  const dateNow = new Date().getTime();
  if (dateNow - birthday < 18 * 365 * 24 * 60 * 60 * 1000 || dateNow - birthday > 100 * 365 * 24 * 60 * 60 * 1000) {
    return {checkBirthDay: true};
  } else {
    return null;
  }
};

@Component({
  selector: 'app-employee-edit',
  templateUrl: './employee-edit.component.html',
  styleUrls: ['./employee-edit.component.css']
})
export class EmployeeEditComponent implements OnInit {
  employee: Employee = {};
  divisions: Division[] = [];
  formUpdateEmployee: FormGroup = new FormGroup({});

  /**
   * Create bt: LongPT
   * Date created: 03/02/2023
   * Function: form create employee
   */
  constructor(private employeeService: EmployeeService,
              private divisionService: DivisionService,
              private router: Router,
              private toastrService: ToastrService,
              private activatedRoute: ActivatedRoute, private title: Title) {
    this.title.setTitle('Chỉnh sửa thông tin nhân viên');
    this.formUpdateEmployee = new FormGroup({
      idEmployee: new FormControl(this.employee.idEmployee),
      codeEmployee: new FormControl(this.employee.codeEmployee),
      nameEmployee: new FormControl(this.employee.nameEmployee, [Validators.required, Validators.pattern('^[AÀẢÃÁẠĂẰẲẴẮẶÂẦẨẪẤẬBCDĐEÈẺẼÉẸÊỀỂỄẾỆFGHIÌỈĨÍỊJKLMNOÒỎÕÓỌÔỒỔỖỐỘƠỜỞỠỚỢPQRSTUÙỦŨÚỤƯỪỬỮỨỰVWXYỲỶỸÝỴZ][aàảãáạăằẳẵắặâầẩẫấậbcdđeèẻẽéẹêềểễếệfghiìỉĩíịjklmnoòỏõóọôồổỗốộơờởỡớợpqrstuùủũúụưừửữứựvwxyỳỷỹýỵz]+ [AÀẢÃÁẠĂẰẲẴẮẶÂẦẨẪẤẬBCDĐEÈẺẼÉẸÊỀỂỄẾỆFGHIÌỈĨÍỊJKLMNOÒỎÕÓỌÔỒỔỖỐỘƠỜỞỠỚỢPQRSTUÙỦŨÚỤƯỪỬỮỨỰVWXYỲỶỸÝỴZ][aàảãáạăằẳẵắặâầẩẫấậbcdđeèẻẽéẹêềểễếệfghiìỉĩíịjklmnoòỏõóọôồổỗốộơờởỡớợpqrstuùủũúụưừửữứựvwxyỳỷỹýỵz]+(?: [AÀẢÃÁẠĂẰẲẴẮẶÂẦẨẪẤẬBCDĐEÈẺẼÉẸÊỀỂỄẾỆFGHIÌỈĨÍỊJKLMNOÒỎÕÓỌÔỒỔỖỐỘƠỜỞỠỚỢPQRSTUÙỦŨÚỤƯỪỬỮỨỰVWXYỲỶỸÝỴZ][aàảãáạăằẳẵắặâầẩẫấậbcdđeèẻẽéẹêềểễếệfghiìỉĩíịjklmnoòỏõóọôồổỗốộơờởỡớợpqrstuùủũúụưừửữứựvwxyỳỷỹýỵz]*)*$')]),
      phoneEmployee: new FormControl(this.employee.phoneEmployee, [Validators.required, Validators.pattern('^(((\\+|)84)|0)(3|5|7|8|9)+([0-9]{8})$')]),
      emailEmployee: new FormControl(this.employee.emailEmployee, [Validators.required, Validators.email]),
      addressEmployee: new FormControl(this.employee.addressEmployee, Validators.required),
      genderEmployee: new FormControl(this.employee.genderEmployee, Validators.required),
      dateOfBirth: new FormControl(this.employee.dateOfBirth, Validators.required),
      division: new FormControl(''),
      flagDeleted: new FormControl(this.employee.flagDeleted)
    }, {validators: [checkBirthDay]});
    this.activatedRoute.paramMap.subscribe(data => {
      const id = data.get('id');
      if (id != null) {
        this.getEmployee(+id);
      }

    });
  }

  /**
   * Create bt: LongPT
   * Date created: 03/02/2023
   * Function: compare with
   */
  compareCate(item1: Division, item2: Division): boolean {
    return item1 && item2 ? item1.idDivision === item2.idDivision: item1 === item2;
  }

  ngOnInit(): void {
    this.getAllDivision();
  }

  /**
   * Create bt: LongPT
   * Date created: 03/02/2023
   * Function: get employee by id
   * @param id: number
   */
  getEmployee(id: number): void {
    this.employeeService.findById(id).subscribe(data => {
      this.formUpdateEmployee.patchValue(data);
      this.employee = data;
    });
  }

  /**
   * Create bt: LongPT
   * Date created: 03/02/2023
   * Function: get all list division
   */
  getAllDivision(): void {
    this.divisionService.getAllDivision().subscribe(data => {
      this.divisions = data;
    }, error => {
    });
  }

  /**
   * Create bt: LongPT
   * Date created: 03/02/2023
   * Function: update employee
   */
  updateEmployee(): void {
    this.employeeService.updateEmployee(this.formUpdateEmployee.value).subscribe(data => {
      if (data != null) {
        this.toastrService.warning('Chỉnh sủa không thành công.', 'Cảnh báo');
      } else {
        this.toastrService.success('Chỉnh sửa thành công.', 'Thông báo');
        this.router.navigateByUrl('/employee');
      }
    }, error => {
    });
  }
}
