import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {Customer} from "../../entity/customer/customer";
import {PageCustomerDto} from "../../dto/page-customer-dto";

@Injectable({
  providedIn: 'root'
})
export class CustomerService {
  URL_CUSTOMER = 'http://localhost:8080';

  /**
   * Create by: HocHH
   * @param httpClient
   */
  constructor(private httpClient: HttpClient) { }
  getAllCustomerPaging(pageable: any, allSearch: any): Observable<PageCustomerDto>{
    return this.httpClient.get<PageCustomerDto>(this.URL_CUSTOMER + '/api/customer?page=' + pageable);
  }
}
