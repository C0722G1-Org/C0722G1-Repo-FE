import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Customer} from '../entity/customer/customer';
import {Observable} from 'rxjs';
import {environment} from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CustomerService {

  constructor(private httpClient: HttpClient) {

  }

  /**
   * Create by: HuyNV
   * Date created : 01/02/2023
   * Function : to create customer
   *
   * @param customer
   */
  createCustomer(customer: Customer): Observable<Customer> {
    return this.httpClient.post<Customer>(environment.customerURL, customer);
  }

  /**
   * Create by: HuyNV
   * Date created : 01/02/2023
   * Function : to find by id customer
   *
   * @param idCustomer
   */
  detailCustomerById(idCustomer: number): Observable<Customer> {
    return this.httpClient.get<Customer>(environment.detailCustomerURL + '/detail/' + idCustomer);
  }
}
