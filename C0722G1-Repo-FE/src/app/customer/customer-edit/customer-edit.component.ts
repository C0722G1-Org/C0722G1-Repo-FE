import {Component, OnInit} from '@angular/core';
import {Customer} from '../../entity/customer/customer';
import {FormControl, FormGroup} from '@angular/forms';
import {CustomerService} from '../../service/customer.service';
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
      nameCustomer: new FormControl(),
      emailCustomer: new FormControl(),
      addressCustomer: new FormControl(),
      idCardCustomer: new FormControl(),
      codeCustomer: new FormControl(),
      genderCustomer: new FormControl(),
      dateOfBirth: new FormControl(),
      approvalCustomer: new FormControl(),
      phoneCustomer1: new FormControl(),
      phoneCustomer2: new FormControl(),
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

  // tslint:disable-next-line:typedef
  getCustomerById(idCustomer: number) {
    this.customerService.findById(idCustomer).subscribe(data => {
      this.editForm.patchValue(data);
    });
  }

  // tslint:disable-next-line:typedef
  updateCustomer() {
    const customer = this.editForm.value;
    console.log(this.editForm);
    this.customerService.updateCustomer(customer).subscribe(data => {
      this.router.navigateByUrl('');
    });
  }
}
