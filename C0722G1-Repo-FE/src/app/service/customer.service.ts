import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {PageCustomerDto} from '../dto/page-customer-dto';
import {CustomerEdit} from '../entity/customer/customer-edit';
import {Customer} from '../entity/customer/customer';


@Injectable({
  providedIn: 'root'
})
export class CustomerService {
  URL_CUSTOMER = 'http://localhost:8080';
  CUSTOMER_URL = 'http://localhost:8080/api/customer';
  CUSTOMER_URL_UPDATE = 'http://localhost:8080/api/customer/update-customer';
  urlCustomer = 'http://localhost:8080/api/customer/signup';
  urlListMaileCustomer = 'http://localhost:8080/api/customer/ListMailCustomerAnhNameAccount' ;
  /**
   * Create by: HocHH
   * @param httpClient
   */
  constructor(private httpClient: HttpClient) {
  }

  getAllCustomerPaging(pageable: any, allSearch: any): Observable<PageCustomerDto> {
    console.log(this.URL_CUSTOMER + '/api/customer?allSearch=' + allSearch + '&page=' + pageable);
    return this.httpClient.get<PageCustomerDto>(this.URL_CUSTOMER + '/api/customer?allSearch=' + allSearch + '&page=' + pageable);
  }

  findById(idCustomer: number): Observable<any> {
    return this.httpClient.get(this.CUSTOMER_URL + '/' + idCustomer);
  }

  updateCustomer(customer: CustomerEdit): Observable<any> {
    console.log(customer);
    return this.httpClient.patch(this.CUSTOMER_URL_UPDATE, customer);
  }




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

  findListMailCustomerr(): Observable<string[]> {
    return this.httpClient.get<string[]>(this.urlListMaileCustomer);
  }


}
