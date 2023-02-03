import {Component, OnInit} from '@angular/core';
import {Customer} from '../../entity/customer/customer';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {CustomerService} from '../../service/customer/customer.service';
import {ActivatedRoute, Router} from '@angular/router';

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
              private activatedRoute: ActivatedRoute) {
    this.editForm = new FormGroup({
      idCustomer: new FormControl(),
      nameCustomer: new FormControl('', [Validators.minLength(5), Validators.maxLength(50), Validators.required]),
      emailCustomer: new FormControl('', [Validators.required, Validators.email]),
      addressCustomer: new FormControl('', [Validators.required]),
      idCardCustomer: new FormControl('', [Validators.required]),
      codeCustomer: new FormControl(),
      genderCustomer: new FormControl('', [Validators.required]),
      dateOfBirth: new FormControl('', [Validators.required]),
      approvalCustomer: new FormControl(),
      phoneCustomer1: new FormControl('', [Validators.required, Validators.pattern('(((\\+|)84)|0)(3|5|7|8|9)+([0-9]{8})')]),
      phoneCustomer2: new FormControl('', [Validators.required, Validators.pattern('(((\\+|)84)|0)(3|5|7|8|9)+([0-9]{8})')]),
      account: new FormControl()
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
   */
  // tslint:disable-next-line:typedef
  getCustomerById(idCustomer: number) {
    this.customerService.findById(idCustomer).subscribe(data => {
      this.editForm.patchValue(data);
    });
  }

  /**
   * Create by: VanNTC
   * Date created: 31/01/2023
   */

  updateCustomer(): void {
    const customer = this.editForm.value;
    console.log(this.editForm.value);
    this.customerService.updateCustomer(customer).subscribe(data => {
      this.router.navigateByUrl('');
    });
  }
}
