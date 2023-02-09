import {Division} from '../../entity/employee/division';
import {EmployeeService} from '../../service/employee.service';
import {DivisionService} from '../../service/division.service';
import {Component, OnInit} from '@angular/core';
import {AbstractControl, FormControl, FormGroup, ValidationErrors, ValidatorFn, Validators} from '@angular/forms';
import {Router} from '@angular/router';
import {ToastrService} from 'ngx-toastr';
import {CustomerDtoEmailAndUsername} from "../../dto/customer/customerDtoEmailAndUsername";
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
  selector: 'app-employee-create',
  templateUrl: './employee-create.component.html',
  styleUrls: ['./employee-create.component.css']
})
export class EmployeeCreateComponent implements OnInit {
  divisions: Division[] = [];
  formCreateEmployee: FormGroup = new FormGroup({});
  private listMailAndUsernameAccount: CustomerDtoEmailAndUsername[] | undefined;

  /**
   * Create bt: LongPT
   * Date created: 03/02/2023
   * Function: form update employee
   */


  constructor(private employeeService: EmployeeService,
              private divisionService: DivisionService,
              private router: Router,
              private toastrService: ToastrService,
              private title: Title) {
    this.title.setTitle('Thêm mới nhân viên');
    this.formCreateEmployee = new FormGroup({
      idEmployee: new FormControl(),
      codeEmployee: new FormControl('', [Validators.required, Validators.pattern('^NV-[0-9]{4}$')]),
      nameEmployee: new FormControl('', [Validators.required, Validators.pattern('^[AÀẢÃÁẠĂẰẲẴẮẶÂẦẨẪẤẬBCDĐEÈẺẼÉẸÊỀỂỄẾỆFGHIÌỈĨÍỊJKLMNOÒỎÕÓỌÔỒỔỖỐỘƠỜỞỠỚỢPQRSTUÙỦŨÚỤƯỪỬỮỨỰVWXYỲỶỸÝỴZ][aàảãáạăằẳẵắặâầẩẫấậbcdđeèẻẽéẹêềểễếệfghiìỉĩíịjklmnoòỏõóọôồổỗốộơờởỡớợpqrstuùủũúụưừửữứựvwxyỳỷỹýỵz]+ [AÀẢÃÁẠĂẰẲẴẮẶÂẦẨẪẤẬBCDĐEÈẺẼÉẸÊỀỂỄẾỆFGHIÌỈĨÍỊJKLMNOÒỎÕÓỌÔỒỔỖỐỘƠỜỞỠỚỢPQRSTUÙỦŨÚỤƯỪỬỮỨỰVWXYỲỶỸÝỴZ][aàảãáạăằẳẵắặâầẩẫấậbcdđeèẻẽéẹêềểễếệfghiìỉĩíịjklmnoòỏõóọôồổỗốộơờởỡớợpqrstuùủũúụưừửữứựvwxyỳỷỹýỵz]+(?: [AÀẢÃÁẠĂẰẲẴẮẶÂẦẨẪẤẬBCDĐEÈẺẼÉẸÊỀỂỄẾỆFGHIÌỈĨÍỊJKLMNOÒỎÕÓỌÔỒỔỖỐỘƠỜỞỠỚỢPQRSTUÙỦŨÚỤƯỪỬỮỨỰVWXYỲỶỸÝỴZ][aàảãáạăằẳẵắặâầẩẫấậbcdđeèẻẽéẹêềểễếệfghiìỉĩíịjklmnoòỏõóọôồổỗốộơờởỡớợpqrstuùủũúụưừửữứựvwxyỳỷỹýỵz]*)*$')]),
      phoneEmployee: new FormControl('', [Validators.required, Validators.pattern('^(((\\+|)84)|0)(3|5|7|8|9)+([0-9]{8})$')]),
      emailEmployee: new FormControl('', [Validators.required, Validators.email]),
      addressEmployee: new FormControl('', Validators.required),
      genderEmployee: new FormControl('', Validators.required),
      dateOfBirth: new FormControl('', Validators.required),
      division: new FormGroup({
        idDivision: new FormControl(''),
        nameDivision: new FormControl('')
      }),
      flagDeleted: new FormControl(false),
      account: new FormGroup({
        idAccount: new FormControl(''),
        name: new FormControl(''),
        usernameAccount: new FormControl(''),
        email: new FormControl(''),
        encryptPassword: new FormControl(''),
        flagDelete: new FormControl('')
      })
    }, {validators: [checkBirthDay, this.checkAccount, this.checkEmail]});
  }

  /**
   * Create bt: LongPT
   * Date created: 03/02/2023
   * Function: create employee
   */
  createEmployee(): void {
    const employee = this.formCreateEmployee.value;
    this.employeeService.saveEmployee(employee).subscribe(data => {
      this.toastrService.success('Thêm mới thành công.', 'Thông báo');
      this.router.navigateByUrl('/employee');
    }, error => {
      this.toastrService.error('Thêm mới không thành công.', 'Thông báo');
    });
  }

  ngOnInit(): void {
    this.getListMail();
    this.getAllDivision();
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

  getListMail(): void {
    this.employeeService.findListMail().subscribe(list => {
      this.listMailAndUsernameAccount = list;
    });
  }

  checkAccount: ValidatorFn = (control: AbstractControl): { checkAccount: boolean } => {
    // @ts-ignore
    const username =  control.get('account.usernameAccount')?.value;
    let result =  {checkAccount: false};
    // @ts-ignore
    this.listMailAndUsernameAccount?.forEach(value => {
      if (username === value.usernameAccount) {
        result = {checkAccount: true};
      }
    });
    return result;
  }

  checkEmail: ValidatorFn = (control: AbstractControl): { checkEmail: boolean } => {
    // @ts-ignore
    const email =  control.get('emailEmployee')?.value;
    let result =  {checkEmail: false};
    // @ts-ignore
    this.listMailAndUsernameAccount?.forEach(value => {
      // @ts-ignore
      if (email === value.email) {
        result = {checkEmail: true};
      }
    });
    return result;
  }
}
