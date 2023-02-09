import {Account} from '../../entity/account/account';
import {Customer} from '../../entity/customer/customer';
import {CustomerService} from '../../service/customer.service';
import {Router} from '@angular/router';
import {AbstractControl, FormBuilder, FormControl, FormGroup, ValidationErrors, ValidatorFn, Validators} from '@angular/forms';
import {Component, OnInit} from '@angular/core';
import {ToastrService} from 'ngx-toastr';
import {CustomerDtoEmailAndUsername} from "../../dto/customer/customerDtoEmailAndUsername";
import {TokenService} from "../../service/token.service";
import {Title} from "@angular/platform-browser";


export const checkBirthDay: ValidatorFn = (control: AbstractControl): ValidationErrors | null => {
  // @ts-ignore
  const birthday = new Date(control.get('birthDay').value).getTime();
  const dateNow = new Date().getTime();
  if (dateNow - birthday < 18 * 365 * 24 * 60 * 60 * 1000) {
    return {checkBirthDay: true};
  } else {
    return null;
  }
};


@Component({
  selector: 'app-customer-create',
  templateUrl: './customer-create.component.html',
  styleUrls: ['./customer-create.component.css']
})
export class CustomerCreateComponent implements OnInit {
  checkLogin = false;
  name: string | null | undefined;
  roles: string[] = [];
  idAccount: string | null | undefined;


  constructor(private customerService: CustomerService,
              private router: Router,
              private formBuilder: FormBuilder,
              private tokenService: TokenService,
              // tslint:disable-next-line:variable-name
              private _toast: ToastrService,
              private title: Title
              ) {
    this.title.setTitle('Đăng ký')
  }

  submitted = false;
  action = true;
  status = false;
  account: Account | undefined;
  customer: Customer | undefined;
  result = false;
  private customerForm: FormGroup | undefined;
  private listMailCustomerAndUsernameAccount: CustomerDtoEmailAndUsername[] | undefined;

  ngOnInit(): void {
    if (this.tokenService.getToken()) {
      this.checkLogin = true;
      this.name = this.tokenService.getName();
      this.roles = this.tokenService.getRole();
      this.idAccount = this.tokenService.getIdAccount();
    };
    this.getListMailCustomer();
    // tslint:disable-next-line:only-arrow-functions typedef
    window.onbeforeunload = function(e: Event | undefined) {
      e = e || window.event;
      // For IE and Firefox prior to version 4
      if (e) {
        e.returnValue = Boolean('Sure?');
      }
      // For Safari
      return 'Sure?';
    };

  }

  checkPasswords(group: AbstractControl): any {
    const passwordCheck = group.value;
    return (passwordCheck.encryptPassword === passwordCheck.passwordConfirm ? null : {notSame: true});
  }

  checkDateOfBirth(abstractControl: AbstractControl): any {
    const formYear = Number(new Date(abstractControl.value).getFullYear());
    const formMonth = Number(new Date(abstractControl.value).getMonth() + 1);
    const formDay = Number(new Date(abstractControl.value).getDate());

    return (new Date().getFullYear() - formYear > 15) ? null : {invalidDateOfBirth: true};
  }

  getListMailCustomer(): void {
    this.customerService.findListMailCustomerr().subscribe(list => {

      // for (let i = 0; i<list.length; i++){
      // }
      this.listMailCustomerAndUsernameAccount = list;
      // tslint:disable-next-line:no-unused-expression
      // @ts-ignore
      this.customerForm = this.formBuilder.group(
        {
          idCustomer: new FormControl(''),
          nameCustomer: new FormControl('', [Validators.required, Validators.pattern(
            '[a-zA-Z _ÀÁÂÃÈÉÊÌÍÒÓÔÕÙÚĂĐĨŨƠàáâãèéêìíòóôõùúăđĩũơƯĂẠẢẤẦẨẪẬẮẰẲẴẶẸẺẼỀỀỂưăạảấầẩẫậắằẳẵặẹẻẽềềểỄỆỈỊỌỎỐỒỔỖỘỚỜỞỠỢỤỦỨỪ' +
            'ễệỉịọỏốồổỗộớờởỡợụủứừỬỮỰỲỴÝỶỸửữựỳỵỷỹ]+')]),
          emailCustomer: new FormControl('', [Validators.required,
            Validators.pattern('^[a-zA-Z0-9.!#$%&\'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\\.[a-zA-Z0-9-]+)*$')]),
          addressCustomer: new FormControl('',[Validators.required, Validators.maxLength(255), Validators.minLength(5)]),
          idCardCustomer: new FormControl('', [Validators.required,
            Validators.pattern('^(\\d{12})$')]),
          codeCustomer: new FormControl(''),
          genderCustomer: new FormControl('', Validators.required),
          dateOfBirth: new FormControl('', this.checkDateOfBirth),
          flagDelete: new FormControl(''),
          approvalCustomer: new FormControl(''),
          phoneCustomer1: new FormControl('', [Validators.required, Validators.pattern('[0][9][0]\\d{7}')]),
          phoneCustomer2: new FormControl('', [
            Validators.pattern('[0][9][0]\\d{7}')]),
          usernameAccount: new FormControl('', [Validators.required,
            Validators.pattern('[a-zA-Z0-9' +
              ' _ÀÁÂÃÈÉÊÌÍÒÓÔÕÙÚĂĐĨŨƠàáâãèéêìíòóôõùúăđĩũơƯĂẠẢẤẦẨẪẬẮẰẲẴẶẸẺẼỀỀỂưăạảấầẩẫậắằẳẵặẹẻẽềềểỄỆỈỊỌỎỐỒỔỖỘỚỜỞỠỢỤỦỨỪ' +
              'ễệỉịọỏốồổỗộớờởỡợụủứừỬỮỰỲỴÝỶỸửữựỳỵỷỹ]+'),
            Validators.minLength(3)]),
          passGroup: new FormGroup(
            {
              encryptPassword: new FormControl('', [Validators.required,
                Validators.minLength(6)]),
              passwordConfirm: new FormControl('', [Validators.required,
                Validators.minLength(6)])
            }, this.checkPasswords
          )
        }, {validators: [this.isExist, this.areEqual, this.checkPhoneNumber ]},
      );
    });
  }

  submit(): void {
    this.submitted = true;
    // @ts-ignore
    this.customer = this.customerForm.value;
    // @ts-ignore
    this.customer?.encryptPassword = this.customerForm.get('passGroup').get('encryptPassword').value;
    // @ts-ignore
    this.customerService.saveCustomer(this.customer).subscribe(value => {
      this._toast.success('Đăng ký thành công.');
      this.router.navigateByUrl('/security/login');
    }, error => {
      this.action = false;
      this._toast.error('Đăng ký không thành công.','Thông báo')
    }, () => {
    });
  }


  // tslint:disable-next-line:typedef
  onchangeStautus() {
    this.status = !this.status;
  }

  isExist: ValidatorFn = (control: AbstractControl): ValidationErrors | null => {
    // @ts-ignore
    const email = control.get('emailCustomer').value;
    let result = null;
    // @ts-ignore
    this.listMailCustomerAndUsernameAccount.forEach(value => {
      // @ts-ignore
      if (email === value.email) {
        result = {isExist: true};
      }
    });
    return result;
  }
  areEqual: ValidatorFn = (control: AbstractControl): ValidationErrors | null => {
    // @ts-ignore
    const username = control.get('usernameAccount').value;
    let result = null;
    // @ts-ignore
    this.listMailCustomerAndUsernameAccount.forEach(value => {
      if (username === value.usernameAccount) {
        result = {areEqual: true};
      }
    });
    return result;
  }

  checkPhoneNumber: ValidatorFn = (control: AbstractControl): ValidationErrors | null => {
    // @ts-ignore
    const phoneNumber = control.get('phoneCustomer1').value;
    let result = null;
    // @ts-ignore
    this.listMailCustomerAndUsernameAccount.forEach(value => {
      if (phoneNumber === value.phoneCustomerMd) {
        result = {checkPhoneNumber: true};
      }
    });
    return result;
  }


  resetFormAndData(): void {
    this.ngOnInit();
  }
}
