import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup} from '@angular/forms';
import {Customer} from '../../entity/customer/customer';
import {Router} from '@angular/router';
import {CustomerService} from '../../service/customer.service';

@Component({
  selector: 'app-customer-add',
  templateUrl: './customer-add.component.html',
  styleUrls: ['./customer-add.component.css']
})
export class CustomerAddComponent implements OnInit {
  rfAddCustomer: FormGroup | undefined;


  constructor(private builder: FormBuilder,
              private router: Router,
              private customerService: CustomerService) {
  }

  ngOnInit(): void {
    this.getAddCustomer();
  }

  getAddCustomer(): void {
    this.rfAddCustomer = this.builder.group({
      nameCustomer: [''],
      emailCustomer: [''],
      addressCustomer: [''],
      idCardCustomer: [''],
      codeCustomer: [''],
      genderCustomer: [''],
      dateOfBirth: [''],
      phoneCustomer1: [''],
      phoneCustomer2: [''],
      usernameAccount: [''],
      encryptPassword: ['']
    });
  }

  addCustomer(): void {
    if (this.rfAddCustomer?.valid) {
      this.customerService.createCustomer(this.rfAddCustomer?.value).subscribe(
        data => {
          this.router.navigateByUrl('customer');
        }
      );
    }
  }

}
