import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Customer} from '../entity/customer/customer';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CustomerService {

  CUSTOMER_URL = 'http://localhost:8080/api/customers';

  constructor(private httpClient: HttpClient) {
  }

  findById(idCustomer: number): Observable<any> {
    return this.httpClient.get(this.CUSTOMER_URL + '/' + idCustomer);
  }

  updateCustomer(customer: Customer): Observable<any> {
    return this.httpClient.patch(this.CUSTOMER_URL + '/' + customer.idCustomer, customer);
  }

}
