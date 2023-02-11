import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {PageCustomerDto} from '../dto/page-customer-dto';
import {CustomerEdit} from '../entity/customer/customer-edit';
import {Customer} from '../entity/customer/customer';
import {environment} from '../../environments/environment';
import {CustomerDtoEmailAndUsername} from "../dto/customer/customerDtoEmailAndUsername";


@Injectable({
  providedIn: 'root'
})
export class CustomerService {
  URL_CUSTOMER = 'http://localhost:8080';
  CUSTOMER_URL = 'http://localhost:8080/api/customer';
  CUSTOMER_URL_UPDATE = 'http://localhost:8080/api/customer/update-customer';
  urlCustomer = 'http://localhost:8080/api/public/signup';
  urlListMaileCustomer = 'http://localhost:8080/api/public/ListMailCustomerAnhNameAccount' ;
  /**
   * Create by: HocHH
   * @param httpClient
   */
  constructor(private httpClient: HttpClient) {
  }

  getAllCustomerPaging(pageable: any, allSearch: any): Observable<PageCustomerDto> {
    return this.httpClient.get<PageCustomerDto>(this.URL_CUSTOMER + '/api/customer?allSearch=' + allSearch + '&page=' + pageable);
  }

  findById(idCustomer: number): Observable<any> {
    return this.httpClient.get(this.CUSTOMER_URL + '/' + idCustomer);
  }

  updateCustomer(customer: CustomerEdit): Observable<any> {
    return this.httpClient.patch(this.CUSTOMER_URL_UPDATE, customer);
  }



  /**
   * creator: Trịnh Minh Đức
   * date:31/01/2023
   * method of using save customer
   */
  // tslint:disable-next-line:typedef
  saveCustomer(customer: Customer | undefined) {
    return this.httpClient.post<Customer>(this.urlCustomer, customer);
  }
  /**
   * creator: Trịnh Minh Đức
   * date:31/01/2023
   * method of using save customer
   */
  findListMailCustomerr(): Observable<CustomerDtoEmailAndUsername[]> {
    return this.httpClient.get<CustomerDtoEmailAndUsername[]>(this.urlListMaileCustomer);
  }



  /**
   * Create by: HuyNV
   * Date created : 01/02/2023
   * Function : to create customer
   *
   */
  createCustomer(customer: Customer): Observable<Customer> {
    return this.httpClient.post<Customer>(environment.customerURL, customer);
  }

  /**
   * Create by: HuyNV
   * Date created : 01/02/2023
   * Function : to find by id customer
   *
   */
  detailCustomerById(idCustomer: number): Observable<Customer> {
    return this.httpClient.get<Customer>(environment.detailCustomerURL + '/detail/' + idCustomer);
  }

  /**
   * Create by: HocHH
   * @param id
   */
  deleteCustomerById(id: number | undefined){
    // @ts-ignore
    return this.httpClient.delete('http://localhost:8080/api/customer/delete/'+ id);
  }
}
