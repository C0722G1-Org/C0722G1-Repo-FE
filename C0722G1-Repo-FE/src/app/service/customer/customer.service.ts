import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Customer} from '../../entity/customer/customer';

@Injectable({
  providedIn: 'root'
})
export class CustomerService {

  CUSTOMER_URL = 'http://localhost:8080/api/customer';

  constructor(private httpClient: HttpClient) {
  }

  findById(idCustomer: number): Observable<any> {
    return this.httpClient.get(this.CUSTOMER_URL + '/' + idCustomer);
  }

  updateCustomer(customer: Customer): Observable<any> {
    console.log(customer);
    return this.httpClient.patch(this.CUSTOMER_URL, customer);
  }
}
