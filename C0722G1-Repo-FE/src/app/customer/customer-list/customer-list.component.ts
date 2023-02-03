import {Component, OnInit} from '@angular/core';
import {Customer} from "../../entity/customer/customer";
import {CustomerService} from "../../service/customer/customer.service";
import {Router} from "@angular/router";
import {PageCustomerDto} from "../../dto/page-customer-dto";

@Component({
  selector: 'app-customer-list',
  templateUrl: './customer-list.component.html',
  styleUrls: ['./customer-list.component.css']
})
export class CustomerListComponent implements OnInit {
  // pageNotifications!: PageNotificationDto;
  //   rfSearch!: FormGroup;
  //   deleteIds!: number[];
  //   deleteNotifications!: NotificationDeleteDto[];
  //   checkedAll!: boolean;
  //   orderNumber!: number;
  customer!: PageCustomerDto;
  temp: Customer = {};
  allSearch = '';
  pageable: any;

  constructor(private customerService: CustomerService,
              private router: Router) {
    this.getAllCustomerListComponent(this.pageable);

  }

  //searchNotification(pageNumber: number): void {
  //     this.notificationService.getPageNotifications(this.rfSearch.value, pageNumber).subscribe(next => {
  //       this.pageNotifications = next;
  //     }, error => {
  //       console.log('Lỗi truy xuất dữ liệu.');
  //     });
  //   }
  private getAllCustomerListComponent(pageable: any): void {
    this.allSearch = '';
    this.customerService.getAllCustomerPaging(pageable, this.allSearch).subscribe(data => {
      this.customer=data;
      console.log(this.customer);
      console.log(this.pageable);
    }, error => {
    }, () => {
    });
  }

  ngOnInit(): void {
    this.getAllCustomerListComponent(0);
  }
  gotoPage(pageNumber: number): void {
    this.getAllCustomerListComponent(pageNumber);
  }
  reload(): void {
    console.log(this.pageable);
    this.getAllCustomerListComponent(this.pageable);
  }
}
