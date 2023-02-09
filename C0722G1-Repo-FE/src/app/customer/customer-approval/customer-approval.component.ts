import {Component, EventEmitter ,Input, OnInit, Output} from '@angular/core';
import {Customer} from '../../entity/customer/customer';
import {CustomerApprovalService} from '../../service/customer-approval.service';
import {ToastrService} from 'ngx-toastr';


@Component({
  selector: 'app-customer-approval',
  templateUrl: './customer-approval.component.html',
  styleUrls: ['./customer-approval.component.css']
})
export class CustomerApprovalComponent implements OnInit {

  @Input()
  customerApproval: Customer = {};
  @Output()
  emiter = new EventEmitter();

  constructor(private customerApprovalService: CustomerApprovalService ,
              private toastrService: ToastrService) {
  }

  ngOnInit(): void {
  }

  // tslint:disable-next-line:typedef
  approvalCustomer() {
    this.customerApprovalService.approvalCustomerById(this.customerApproval.id_customer).subscribe(data => {
        this.emiter.emit('');
        this.toastrService.success('Duyệt thành công', 'Thông báo', {
          timeOut: 2000,
          progressBar: true,
          positionClass: 'toast-top-right',
          easing: 'ease-in'
        });
      }
      , error => {
        this.toastrService.error('Đã xảy ra lỗi khi duyệt', 'Lỗi', {
          timeOut: 2000,
          progressBar: true,
          positionClass: 'toast-top-right',
          easing: 'ease-in'
        });
      }, () => {
      });
  }


}
