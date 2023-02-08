import {PageCustomerDto} from '../../dto/page-customer-dto';
import {Customer} from '../../entity/customer/customer';
import {CustomerService} from '../../service/customer.service';
import {Router} from '@angular/router';
import {Title} from '@angular/platform-browser';
import {Component, OnInit} from '@angular/core';



@Component({
  selector: 'app-customer-list',
  templateUrl: './customer-list.component.html',
  styleUrls: ['./customer-list.component.css']
})
export class CustomerListComponent implements OnInit {

  customer!: PageCustomerDto;
  temp: Customer = {};
  allSearch = '';
  pageable: any;

  constructor(private customerService: CustomerService,
              private router: Router,
              private titleService: Title) {
    this.titleService.setTitle('Danh sách khách hàng');

  }

  ngOnInit(): void {
    this.getAllCustomerListComponent(0);
  }

  private getAllCustomerListComponent(pageable: any): void {
    this.customerService.getAllCustomerPaging(pageable, this.allSearch).subscribe(data => {
      this.customer = data;
      console.log(this.customer);
    }, error => {
    }, () => {
    });
  }

  gotoPage(pageNumber: number): void {
    this.getAllCustomerListComponent(pageNumber);
  }

  resetSearchInput(): void {
    this.allSearch = '';
  }

  searchByMore(): void {
    this.pageable = 0;
    this.getAllCustomerListComponent(this.pageable);
    console.log(this.customer);
  }

  reload(): void {
    console.log(this.pageable);
    this.getAllCustomerListComponent(this.pageable);
  }
}
