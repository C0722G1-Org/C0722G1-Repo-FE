import {Component, OnInit} from '@angular/core';
import {AbstractControl, FormBuilder, FormGroup, ValidationErrors, ValidatorFn, Validators} from '@angular/forms';
import {Customer} from '../../entity/customer/customer';
import {Router} from '@angular/router';
import {CustomerService} from '../../service/customer.service';

export const checkBirthDay: ValidatorFn = (control: AbstractControl): ValidationErrors | null => {
  // @ts-ignore
  const birthday = new Date(control.get('dateOfBirth').value).getTime();
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
  selector: 'app-customer-add',
  templateUrl: './customer-add.component.html',
  styleUrls: ['./customer-add.component.css']
})
export class CustomerAddComponent implements OnInit {
  rfAddCustomer: FormGroup | undefined;
  customerList: Customer [] | undefined;


  constructor(private builder: FormBuilder,
              private router: Router,
              private customerService: CustomerService) {
  }

  ngOnInit(): void {
    this.getAddCustomer();
  }

  getAddCustomer(): void {
    this.rfAddCustomer = this.builder.group({
        nameCustomer: ['', [Validators.required, Validators.pattern('^[a-zA-Z_ÀÁÂÃÈÉÊẾÌÍÒÓÔÕÙÚĂĐĨŨƠàáâãèéêếìíòóôõùúăđĩũơƯĂẠẢẤẦẨẪẬẮẰẲẴẶẸẺẼỀỀỂưăạảấầẩẫậắằẳẵặẹẻẽềềểỄỆỈỊỌỎỐỒỔỖỘỚỜỞỠỢỤỦỨỪễệỉịọỏốồổỗộớờởỡợụủứừỬỮỰỲỴÝỶỸửữựỳỵỷỹ ]{5,30}$'),
          Validators.maxLength(50)]],
        usernameAccount: ['', [Validators.required,
          Validators.pattern('^[a-zA-Z0-9.!#$%&\'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\\.[a-zA-Z0-9-]+)*$')]],
        addressCustomer: ['', Validators.required],
        idCardCustomer: ['', [Validators.required, Validators.pattern('\\d{12}')]],
        codeCustomer: [''],
        flagDelete: [false],
        nameAccount: ['CUSTOMER'],
        genderCustomer: [''],
        dateOfBirth: ['', [Validators.required]],
        phoneCustomer1: ['', [Validators.required, Validators.pattern('[0][9][0]\\d{7}')]],
        phoneCustomer2: ['', [Validators.pattern('[0][9][0]\\d{7}')]],
        emailCustomer: [''],
        encryptPassword: ['', [Validators.required, Validators.minLength(6), Validators.maxLength(20)]]
      }, {validators: [checkBirthDay]}
    );
  }

  addCustomer(): void {
    if (this.rfAddCustomer?.valid) {
      // console.log(JSON.parse(this.rfAddCustomer.value));
      // console.log(this.rfAddCustomer.value);
      this.customerService.createCustomer(this.rfAddCustomer?.value).subscribe(
        data => {
          this.router.navigateByUrl('customer');
        }
      );
    }
  }

  resetFormAndData(): void {
    this.ngOnInit();
  }

}
