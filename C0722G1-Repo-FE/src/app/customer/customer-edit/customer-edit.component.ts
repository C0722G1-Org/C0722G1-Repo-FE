
import {CustomerEdit} from '../../entity/customer/customer-edit';
import {CustomerService} from '../../service/customer.service';
import {AbstractControl, FormControl, FormGroup, ValidationErrors, ValidatorFn, Validators} from '@angular/forms';
import {Title} from '@angular/platform-browser';
import {ActivatedRoute, Router} from '@angular/router';
import {ToastrService} from 'ngx-toastr';
import {Component, OnInit} from '@angular/core';

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
  selector: 'app-customer-edit',
  templateUrl: './customer-edit.component.html',
  styleUrls: ['./customer-edit.component.css']
})

export class CustomerEditComponent implements OnInit {

  customer: CustomerEdit = {};
  editForm: FormGroup;

  constructor(private customerService: CustomerService,
              private titleService: Title,
              private router: Router,
              private activatedRoute: ActivatedRoute,
              private toastrService: ToastrService) {
    // @ts-ignore
    this.titleService.setTitle('Edit Info Customer');
    this.editForm = new FormGroup({
      idCustomer: new FormControl(this.customer.idCustomer),
      // tslint:disable-next-line:max-line-length
      nameCustomer: new FormControl(this.customer.nameCustomer, [Validators.minLength(5), Validators.maxLength(50), Validators.required, Validators.pattern('^[AÀẢÃÁẠĂẰẲẴẮẶÂẦẨẪẤẬBCDĐEÈẺẼÉẸÊỀỂỄẾỆFGHIÌỈĨÍỊJKLMNOÒỎÕÓỌÔỒỔỖỐỘƠỜỞỠỚỢPQRSTUÙỦŨÚỤƯỪỬỮỨỰVWXYỲỶỸÝỴZ][aàảãáạăằẳẵắặâầẩẫấậbcdđeèẻẽéẹêềểễếệfghiìỉĩíịjklmnoòỏõóọôồổỗốộơờởỡớợpqrstuùủũúụưừửữứựvwxyỳỷỹýỵz]+ [AÀẢÃÁẠĂẰẲẴẮẶÂẦẨẪẤẬBCDĐEÈẺẼÉẸÊỀỂỄẾỆFGHIÌỈĨÍỊJKLMNOÒỎÕÓỌÔỒỔỖỐỘƠỜỞỠỚỢPQRSTUÙỦŨÚỤƯỪỬỮỨỰVWXYỲỶỸÝỴZ][aàảãáạăằẳẵắặâầẩẫấậbcdđeèẻẽéẹêềểễếệfghiìỉĩíịjklmnoòỏõóọôồổỗốộơờởỡớợpqrstuùủũúụưừửữứựvwxyỳỷỹýỵz]+(?: [AÀẢÃÁẠĂẰẲẴẮẶÂẦẨẪẤẬBCDĐEÈẺẼÉẸÊỀỂỄẾỆFGHIÌỈĨÍỊJKLMNOÒỎÕÓỌÔỒỔỖỐỘƠỜỞỠỚỢPQRSTUÙỦŨÚỤƯỪỬỮỨỰVWXYỲỶỸÝỴZ][aàảãáạăằẳẵắặâầẩẫấậbcdđeèẻẽéẹêềểễếệfghiìỉĩíịjklmnoòỏõóọôồổỗốộơờởỡớợpqrstuùủũúụưừửữứựvwxyỳỷỹýỵz]*)*$')]),
      emailCustomer: new FormControl(this.customer.emailCustomer, [Validators.required, Validators.email]),
      addressCustomer: new FormControl(this.customer.addressCustomer, [Validators.required, Validators.maxLength(255)]),
      idCardCustomer: new FormControl(this.customer.idCardCustomer, [Validators.required, Validators.pattern('[0-9]{12}')]),
      codeCustomer: new FormControl(this.customer.codeCustomer),
      genderCustomer: new FormControl(this.customer.genderCustomer, [Validators.required]),
      dateOfBirth: new FormControl(this.customer.dateOfBirth, [Validators.required]),
      phoneCustomer1: new FormControl(this.customer.phoneCustomer1, [Validators.required, Validators.pattern('(((\\+|)84)|0)(3|5|7|8|9)+([0-9]{8})')]),
      phoneCustomer2: new FormControl(this.customer.phoneCustomer2, [Validators.pattern('(((\\+|)84)|0)(3|5|7|8|9)+([0-9]{8})')]),
    }, {validators: [checkBirthDay]});

    this.activatedRoute.paramMap.subscribe(data => {
      const id = data.get('idCustomer');
      if (id != null) {
        this.getCustomerById(+id);
      }
    });
  }

  ngOnInit(): void {
  }

  /**
   * Create by: VanNTC
   * Date created: 31/01/2023
   * Function: get customer by id
   */
  getCustomerById(idCustomer: number): void {
    this.customerService.findById(idCustomer).subscribe(data => {
      this.editForm.patchValue(data);
      this.customer = data;
    });
  }

  /**
   * Create by: VanNTC
   * Date created: 31/01/2023
   */

  updateCustomer(): void {
    const customer = this.editForm.value;
    this.customerService.updateCustomer(customer).subscribe((data: any) => {
      if (data != null) {
        this.toastrService.error('Không có dữ liệu để chỉnh sửa!', 'Thông báo');
      } else {
        this.toastrService.success('Sửa thông tin khách hàng thành công!', 'Thông báo');
        this.router.navigateByUrl('/customer');
      }
    }, (error: any) => {
    });
  }

}
