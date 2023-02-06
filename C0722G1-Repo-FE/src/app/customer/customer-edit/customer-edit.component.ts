import {Component, OnInit} from '@angular/core';
import {Customer} from '../../entity/customer/customer';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {CustomerService} from '../../service/customer/customer.service';
import {ActivatedRoute, Router} from '@angular/router';
import {ToastrService} from 'ngx-toastr';

@Component({
  selector: 'app-customer-edit',
  templateUrl: './customer-edit.component.html',
  styleUrls: ['./customer-edit.component.css']
})
export class CustomerEditComponent implements OnInit {
  customer: Customer[] = [];
  editForm: FormGroup;

  constructor(private customerService: CustomerService,
              private router: Router,
              private activatedRoute: ActivatedRoute,
              private toastrService: ToastrService) {
    this.editForm = new FormGroup({
      idCustomer: new FormControl(),
      nameCustomer: new FormControl('', [Validators.minLength(5), Validators.maxLength(50), Validators.required, Validators.pattern('^[AÀẢÃÁẠĂẰẲẴẮẶÂẦẨẪẤẬBCDĐEÈẺẼÉẸÊỀỂỄẾỆFGHIÌỈĨÍỊJKLMNOÒỎÕÓỌÔỒỔỖỐỘƠỜỞỠỚỢPQRSTUÙỦŨÚỤƯỪỬỮỨỰVWXYỲỶỸÝỴZ][aàảãáạăằẳẵắặâầẩẫấậbcdđeèẻẽéẹêềểễếệfghiìỉĩíịjklmnoòỏõóọôồổỗốộơờởỡớợpqrstuùủũúụưừửữứựvwxyỳỷỹýỵz]+ [AÀẢÃÁẠĂẰẲẴẮẶÂẦẨẪẤẬBCDĐEÈẺẼÉẸÊỀỂỄẾỆFGHIÌỈĨÍỊJKLMNOÒỎÕÓỌÔỒỔỖỐỘƠỜỞỠỚỢPQRSTUÙỦŨÚỤƯỪỬỮỨỰVWXYỲỶỸÝỴZ][aàảãáạăằẳẵắặâầẩẫấậbcdđeèẻẽéẹêềểễếệfghiìỉĩíịjklmnoòỏõóọôồổỗốộơờởỡớợpqrstuùủũúụưừửữứựvwxyỳỷỹýỵz]+(?: [AÀẢÃÁẠĂẰẲẴẮẶÂẦẨẪẤẬBCDĐEÈẺẼÉẸÊỀỂỄẾỆFGHIÌỈĨÍỊJKLMNOÒỎÕÓỌÔỒỔỖỐỘƠỜỞỠỚỢPQRSTUÙỦŨÚỤƯỪỬỮỨỰVWXYỲỶỸÝỴZ][aàảãáạăằẳẵắặâầẩẫấậbcdđeèẻẽéẹêềểễếệfghiìỉĩíịjklmnoòỏõóọôồổỗốộơờởỡớợpqrstuùủũúụưừửữứựvwxyỳỷỹýỵz]*)*$')]),
      emailCustomer: new FormControl('', [Validators.required, Validators.email]),
      addressCustomer: new FormControl('', [Validators.required]),
      idCardCustomer: new FormControl('', [Validators.required, Validators.pattern('[0-9]{9}')]),
      codeCustomer: new FormControl(),
      genderCustomer: new FormControl('', [Validators.required]),
      dateOfBirth: new FormControl('', [Validators.required]),
      phoneCustomer1: new FormControl('', [Validators.required, Validators.pattern('(((\\+|)84)|0)(3|5|7|8|9)+([0-9]{8})')]),
      phoneCustomer2: new FormControl('', [Validators.pattern('(((\\+|)84)|0)(3|5|7|8|9)+([0-9]{8})')]),
    });

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
      console.log(data);
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
    this.customerService.updateCustomer(customer).subscribe(data => {
      if (data != null) {
        this.toastrService.error('Không có dữ liệu để chỉnh sửa!', 'Thông báo');
      } else {
        this.toastrService.success('Sửa thông tin khách hàng thành công!', 'Thông báo');
        this.router.navigateByUrl('/customer');
      }
    }, error => {
      console.log(error);
    });
  }
}
