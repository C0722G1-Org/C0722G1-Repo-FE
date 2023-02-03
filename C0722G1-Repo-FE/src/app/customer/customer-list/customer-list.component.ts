import {Component, OnInit} from '@angular/core';
import {Customer} from "../../entity/customer/customer";
import {CustomerService} from "../../service/customer/customer.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-customer-list',
  templateUrl: './customer-list.component.html',
  styleUrls: ['./customer-list.component.css']
})
export class CustomerListComponent implements OnInit {

  customer: Customer[] = [];
  temp: Customer = {};
  allSearch = '';
  pageable: any;

  constructor(private customerService: CustomerService,
              private router: Router) {
    this.getAllCustomerListComponent(this.pageable);

  }

  private getAllCustomerListComponent(pageable: any): void {
    this.allSearch = '';
    this.customerService.getAllCustomerPaging(this.allSearch, pageable).subscribe(data => {
      console.log(data);
      // @ts-ignore
      this.customer = data.content;
      // @ts-ignore
      this.pageable = data.pageable;
      console.log(this.customer);
      console.log(this.pageable);
    }, error => {
    }, () => {
    });
  }

  ngOnInit(): void {
  }

  reload(): void {
    console.log(this.pageable);
    this.getAllCustomerListComponent(this.pageable);
  }
}
