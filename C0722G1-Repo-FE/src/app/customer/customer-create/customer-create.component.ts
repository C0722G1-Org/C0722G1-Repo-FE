import {Component, OnInit} from '@angular/core';
import {
  AbstractControl,
  FormBuilder,
  FormControl,
  FormGroup,
  ValidationErrors,
  ValidatorFn,
  Validators
} from '@angular/forms';
import {Router} from '@angular/router';
import {Account} from '../../entity/account/account';
import {Customer} from '../../entity/customer/customer';
import {CustomerService} from '../../service/customer.service';
import {ToastrService} from 'ngx-toastr';



export const checkBirthDay: ValidatorFn = (control: AbstractControl): ValidationErrors | null => {
  // @ts-ignore
  const birthday = new Date(control.get('birthDay').value).getTime();
  console.log(birthday);
  const dateNow = new Date().getTime();
  console.log(dateNow);
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

  constructor(private customerService: CustomerService,
              private router: Router,
              private formBuilder: FormBuilder,
              // tslint:disable-next-line:variable-name
              private _toast: ToastrService) {
  }

  submitted = false;
  action = true;
  status = false;
  account: Account | undefined;
  customer: Customer | undefined;
  result = false;
  private customerForm: FormGroup | undefined;
  private listMailCustomerAndUsernameAccount: Customer[] | undefined;


  ngOnInit(): void {
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




  submit(): void {
    this.submitted = true;
    // @ts-ignore
    this.customer = this.customerForm.value;
    // @ts-ignore
    this.account.usernameAccount = this.customerForm.value.usernameAccount;
    // @ts-ignore
    this.account.encryptPassword = this.customerForm.get('passGroup').get('encryptPassword').value;
    // @ts-ignore
    this.account.email = this.customerForm.value.emailCustomer;
    // @ts-ignore
    this.account.name = this.customerForm.value.nameCustomer;
    // @ts-ignore
    this.customer?.account = this.account;
    // @ts-ignore
    this.customerService.saveCustomer(this.customer).subscribe(value => {
      this.router.navigateByUrl('/customer/create');
      this._toast.success('Đăng Ký Thành Công');
    }, error => {
      this.action = false;
    }, () => {
    });
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
      this.listMailCustomerAndUsernameAccount = list;
      console.log(list);
      // tslint:disable-next-line:no-unused-expression
      this.customerForm = this.formBuilder.group(
        {
          idCustomer: new FormControl(''),
          nameCustomer: new FormControl('', [Validators.required, Validators.pattern(
            '[a-zA-Z _ÀÁÂÃÈÉÊÌÍÒÓÔÕÙÚĂĐĨŨƠàáâãèéêìíòóôõùúăđĩũơƯĂẠẢẤẦẨẪẬẮẰẲẴẶẸẺẼỀỀỂưăạảấầẩẫậắằẳẵặẹẻẽềềểỄỆỈỊỌỎỐỒỔỖỘỚỜỞỠỢỤỦỨỪ' +
            'ễệỉịọỏốồổỗộớờởỡợụủứừỬỮỰỲỴÝỶỸửữựỳỵỷỹ]+')]),
          emailCustomer: new FormControl('', [Validators.required,
            Validators.pattern('^[A-Za-z0-9_.]{4,32}@([a-zA-Z0-9]{2,12})(.[a-zA-Z]{2,12})+$')]),
          addressCustomer: new FormControl('', Validators.required),
          idCardCustomer: new FormControl('', [Validators.required,
            Validators.pattern('^(\\d{12})$')]),
          codeCustomer: new FormControl(''),
          genderCustomer: new FormControl('', Validators.required),
          dateOfBirth: new FormControl('', this.checkDateOfBirth),
          flagDelete: new FormControl(''),
          approvalCustomer: new FormControl(''),
          phoneCustomer1: new FormControl('', [Validators.required,
            Validators.pattern('^([+84][0-9]{10})$')]),
          phoneCustomer2: new FormControl('', [
            Validators.pattern('^([+84][0-9]{10})$')]),
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
        }, {validators: [this.isExist, this.areEqual]},
      );
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
      if (email === value.emailCustomer) {
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
      // @ts-ignore
      if (username === value.account.usernameAccount) {
        result = {areEqual: true};
      }
    });
    return result;
  }
}
