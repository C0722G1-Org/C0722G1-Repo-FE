import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Customer} from '../entity/customer/customer';
import {Observable} from 'rxjs';
import {environment} from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CustomerService {

  CUSTOMER_URL = 'http://localhost:8080/api/customers';

  constructor(private httpClient: HttpClient) {
  }
  createCustomer(customer: Customer): Observable<Customer> {
    return this.httpClient.post<Customer>(environment.customerURL, customer);
  }

  detailCustomerById(idCustomer: number | undefined): Observable<Customer> {
    return this.httpClient.get<Customer>(environment.detailCustomerURL + '/detail/' + 2);
  }

  findById(idCustomer: number): Observable<any> {
    return this.httpClient.get(this.CUSTOMER_URL + '/' + idCustomer);
  }

  updateCustomer(customer: Customer): Observable<any> {
    return this.httpClient.patch(this.CUSTOMER_URL + '/' + customer.idCustomer, customer);
  }
}
