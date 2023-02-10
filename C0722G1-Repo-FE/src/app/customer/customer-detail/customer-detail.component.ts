import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup} from '@angular/forms';
import {Customer} from '../../entity/customer/customer';
import {CustomerService} from '../../service/customer.service';
import {ActivatedRoute, Router} from '@angular/router';
import {Title} from '@angular/platform-browser';
import {ToastrService} from "ngx-toastr";


@Component({
  selector: 'app-customer-detail',
  templateUrl: './customer-detail.component.html',
  styleUrls: ['./customer-detail.component.css']
})
export class CustomerDetailComponent implements OnInit {
  idCustomer: number | undefined;
  customerDetail: Customer | undefined;

  constructor(private customerService: CustomerService,
              private activatedRoute: ActivatedRoute,
              private titleService: Title,
              private formBuilder: FormBuilder,
              private router: Router,
              private toast: ToastrService) {
    this.titleService.setTitle('Xem chi tiết khách hàng');

  }


  ngOnInit(): void {
    this.activatedRoute.paramMap.subscribe(data => {
      const id = data.get('idCustomer');
      if (id != null) {
        this.detailById(+id);
        this.customerService.detailCustomerById(+id).subscribe(
          data => {
            this.customerDetail = data;
          }, error => {
            if (error.status == 400 || 404){
              this.router.navigateByUrl('/**')
            }
          }
        );
      }
    });
  }

  // tslint:disable-next-line:typedef
  detailById(idCustomer: number) {
  }

}









