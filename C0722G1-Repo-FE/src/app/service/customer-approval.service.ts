import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class CustomerApprovalService {

  constructor(private httpClient: HttpClient) { }

  /**
   * Create by: HocHH
   * @param id
   */
  approvalCustomerById(id: number | undefined){
    // @ts-ignore
    return this.httpClient.patch('http://localhost:8080/api/customer/' + id);
  }
}
