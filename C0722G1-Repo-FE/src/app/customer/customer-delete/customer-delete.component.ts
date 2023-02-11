import {Component, Input, EventEmitter, OnInit, Output} from '@angular/core';
import {Customer} from "../../entity/customer/customer";
import {CustomerService} from "../../service/customer.service";
import {ToastrService} from "ngx-toastr";

@Component({
  selector: 'app-customer-delete',
  templateUrl: './customer-delete.component.html',
  styleUrls: ['./customer-delete.component.css']
})
export class CustomerDeleteComponent implements OnInit {

  @Input()
  customerApproval: Customer = {};
  @Output()
  emiter = new EventEmitter();

  constructor(private customerService: CustomerService ,
              private toastrService: ToastrService) {
  }

  ngOnInit(): void {
  }

// tslint:disable-next-line:typedef
  deleteCustomer() {

    this.customerService.deleteCustomerById(this.customerApproval.id_customer).subscribe(deleteData => {
        this.emiter.emit('');
        this.toastrService.success('Xóa thành công.', 'Thông báo', {
          timeOut: 2000,
          progressBar: true,
          positionClass: 'toast-top-right',
          easing: 'ease-in'
        });
      }
      , error => {
        this.toastrService.error('Đã xảy ra lỗi khi xóa.', 'Lỗi', {
          timeOut: 2000,
          progressBar: true,
          positionClass: 'toast-top-right',
          easing: 'ease-in'
        });
      }, () => {
      });
  }

}
