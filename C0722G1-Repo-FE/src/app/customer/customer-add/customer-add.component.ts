import {Customer} from '../../entity/customer/customer';

import {CustomerService} from '../../service/customer.service';
import {Component, OnInit} from '@angular/core';
import {AbstractControl, FormBuilder, FormGroup, ValidationErrors, ValidatorFn, Validators} from '@angular/forms';
import {Router} from '@angular/router';
import {Title} from '@angular/platform-browser';
import {ToastrService} from 'ngx-toastr';
import {CustomerDtoEmailAndUsername} from "../../dto/customer/customerDtoEmailAndUsername";


export const checkBirthDay: ValidatorFn = (control: AbstractControl): ValidationErrors | null => {
  // @ts-ignore
  const birthday = new Date(control.get('dateOfBirth').value).getTime();
  console.log(birthday);
  const dateNow = new Date().getTime();
  console.log(dateNow);
  if (dateNow - birthday < 18 * 365 * 24 * 60 * 60 * 1000 || dateNow - birthday > 100 * 365 * 24 * 60 * 60 * 1000) {
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
  listMailCustomerAndUsernameAccount: CustomerDtoEmailAndUsername[] | undefined;


  constructor(private builder: FormBuilder,
              private router: Router,
              private titleService: Title,
              private toast: ToastrService,
              private customerService: CustomerService) {
    this.titleService.setTitle('Thêm Mới Khách Hàng');
  }

  ngOnInit(): void {
    this.getAddCustomer();
  }

  getAddCustomer(): void {
    // this.customerService.findListMailCustomerr().subscribe(data => {
    //   this.listMailCustomerAndUsernameAccount = data;
      this.rfAddCustomer = this.builder.group({
          nameCustomer: ['', [Validators.required, Validators.pattern('^[AÀẢÃÁẠĂẰẲẴẮẶÂẦẨẪẤẬBCDĐEÈẺẼÉẸÊỀỂỄẾỆFGHIÌỈĨÍỊJKLMNOÒỎÕÓỌÔỒỔỖỐỘƠỜỞỠỚỢPQRSTUÙỦŨÚỤƯỪỬỮỨỰVWXYỲỶỸÝỴZ][aàảãáạăằẳẵắặâầẩẫấậbcdđeèẻẽéẹêềểễếệfghiìỉĩíịjklmnoòỏõóọôồổỗốộơờởỡớợpqrstuùủũúụưừửữứựvwxyỳỷỹýỵz]+ [AÀẢÃÁẠĂẰẲẴẮẶÂẦẨẪẤẬBCDĐEÈẺẼÉẸÊỀỂỄẾỆFGHIÌỈĨÍỊJKLMNOÒỎÕÓỌÔỒỔỖỐỘƠỜỞỠỚỢPQRSTUÙỦŨÚỤƯỪỬỮỨỰVWXYỲỶỸÝỴZ][aàảãáạăằẳẵắặâầẩẫấậbcdđeèẻẽéẹêềểễếệfghiìỉĩíịjklmnoòỏõóọôồổỗốộơờởỡớợpqrstuùủũúụưừửữứựvwxyỳỷỹýỵz]+(?: [AÀẢÃÁẠĂẰẲẴẮẶÂẦẨẪẤẬBCDĐEÈẺẼÉẸÊỀỂỄẾỆFGHIÌỈĨÍỊJKLMNOÒỎÕÓỌÔỒỔỖỐỘƠỜỞỠỚỢPQRSTUÙỦŨÚỤƯỪỬỮỨỰVWXYỲỶỸÝỴZ][aàảãáạăằẳẵắặâầẩẫấậbcdđeèẻẽéẹêềểễếệfghiìỉĩíịjklmnoòỏõóọôồổỗốộơờởỡớợpqrstuùủũúụưừửữứựvwxyỳỷỹýỵz]*)*$'),
            Validators.maxLength(50),
            Validators.minLength(5)]],
          usernameAccount: [''],
          addressCustomer: ['', Validators.required],
          idCardCustomer: ['', [Validators.required, Validators.pattern('\\d{12}')]],
          codeCustomer: [''],
          flagDelete: [false],
          genderCustomer: [''],
          dateOfBirth: ['', [Validators.required]],
          phoneCustomer1: ['', [Validators.required, Validators.pattern('[0][9][0]\\d{7}')]],
          phoneCustomer2: ['', [Validators.pattern('[0][9][0]\\d{7}')]],
          emailCustomer: ['',[Validators.required,
            Validators.pattern('^[a-zA-Z0-9.!#$%&\'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\\.[a-zA-Z0-9-]+)*$')]],
          encryptPassword: ['', [Validators.required, Validators.minLength(6), Validators.maxLength(20)]]
        }, {validators: [checkBirthDay]}
      );
    // });
  }


  addCustomer(): void {
    if (this.rfAddCustomer?.valid) {
      // console.log(JSON.parse(this.rfAddCustomer.value));
      // console.log(this.rfAddCustomer.value);
      this.customerService.createCustomer(this.rfAddCustomer?.value).subscribe(
        data => {
          this.router.navigateByUrl('customer/add');
          this.toast.success('Đăng Ký Thành Công');
          this.resetFormAndData();
        }
      );
    }
  }

  // isExist: ValidatorFn = (control: AbstractControl): ValidationErrors | null => {
  //   // @ts-ignore
  //   const email = control.get('emailCustomer').value;
  //   let result = null;
  //   // @ts-ignore
  //   this.listMailCustomerAndUsernameAccount.forEach(value => {
  //     // @ts-ignore
  //     if (email === value.emailCustomer) {
  //       result = {isExist: true};
  //     }
  //   });
  //   return result;
  // };

  resetFormAndData(): void {
    this.ngOnInit();
  }
}
