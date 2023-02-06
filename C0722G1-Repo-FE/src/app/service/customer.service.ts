import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Account} from '../entity/account/account';
import {Customer} from '../entity/customer/customer';
import {Observable} from 'rxjs';
import {environment} from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CustomerService {

  /**
   * creator: Trịnh Minh Đức
   * date:31/01/2023
   * method of using save customer
   */
  private urlCustomer = 'http://localhost:8080/api/public/signup';
  private  urlListMaileCustomer = 'http://localhost:8080/api/public/ListMailCustomerAnhNameAccount' ;

  constructor(private httpClient: HttpClient) { }

  /**
   * creator: Trịnh Minh Đức
   * date:31/01/2023
   * method of using save customer
   */
  // tslint:disable-next-line:typedef
  saveCustomer(customer: Customer | undefined) {
    console.log(customer);
    return this.httpClient.post<Customer>(this.urlCustomer, customer);
  }
  /**
   * creator: Trịnh Minh Đức
   * date:31/01/2023
   * method of using save customer
   */
  findListMailCustomerr(): Observable<Customer[]> {
    return this.httpClient.get<Customer[]>(this.urlListMaileCustomer);
  }

}
