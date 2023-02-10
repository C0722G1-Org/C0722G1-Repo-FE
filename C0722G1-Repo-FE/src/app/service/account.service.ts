import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {AccountDto} from '../dto/AccountDto';

@Injectable({
  providedIn: 'root'
})
export class AccountService {

  ACCOUNT_URL = 'http://localhost:8080/api/public/account';
  ACCOUNT_URL_UPDATE = 'http://localhost:8080/api/public/update-password';

  constructor(private httpClient: HttpClient) {
  }
  findById(idAccount: number): Observable<any> {
    return this.httpClient.get(this.ACCOUNT_URL + '/' + idAccount);
  }

  updatePassword(accountDto: AccountDto): Observable<any> {
    return this.httpClient.patch(this.ACCOUNT_URL_UPDATE , accountDto);
  }
}
