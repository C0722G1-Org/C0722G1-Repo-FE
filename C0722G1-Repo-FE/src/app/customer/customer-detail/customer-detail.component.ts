import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup} from '@angular/forms';
import {CustomerService} from '../../service/customer.service';
import {ActivatedRoute, ParamMap, Router} from '@angular/router';
import {Customer} from '../../entity/customer/customer';

@Component({
  selector: 'app-customer-detail',
  templateUrl: './customer-detail.component.html',
  styleUrls: ['./customer-detail.component.css']
})
export class CustomerDetailComponent implements OnInit {
  idCustomer: number | undefined;
  rfCustomer: FormGroup | undefined;
  customerDetail: Customer | undefined;

  constructor(private customerService: CustomerService,
              private activatedRoute: ActivatedRoute,
              private formBuilder: FormBuilder,
              private router: Router) {
    this.activatedRoute.paramMap.subscribe(data => {
      const id = data.get('idCustomer');
      if (id != null) {
        this.detailById(+id);
      }
    });
  }


  ngOnInit(): void {
    this.detailById(this.activatedRoute.snapshot.params.idCustomr);
  }

  // tslint:disable-next-line:typedef
  detailById(idCustomer: number) {
    this.customerService.detailCustomerById(idCustomer).subscribe(
      data => {
        console.log(data);
        this.customerDetail = data;
      }
    );
  }

}
