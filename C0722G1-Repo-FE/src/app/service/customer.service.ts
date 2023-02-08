
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

  CUSTOMER_URL = 'http://localhost:8080/api/customers';


  constructor(private httpClient: HttpClient) {

  }

  /**
   * Create by: HuyNV
   * Date created : 01/02/2023
   * Function : to create customer
   *
   * @param customer
   */
  // createCustomer(customer: Customer): Observable<Customer> {
  //   return this.httpClient.post<Customer>(environment.customerURL, customer);
  // }

  // /**
  //  * Create by: HuyNV
  //  * Date created : 01/02/2023
  //  * Function : to find by id customer
  //  *
  //  * @param idCustomer
  //  */
  // detailCustomerById(idCustomer: number): Observable<Customer> {
  //   return this.httpClient.get<Customer>(environment.detailCustomerURL + '/detail/' + idCustomer);
  // }

}
