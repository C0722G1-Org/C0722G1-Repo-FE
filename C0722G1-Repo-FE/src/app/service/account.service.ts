import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Account} from '../entity/account/account';

@Injectable({
  providedIn: 'root'
})
export class AccountService {

  ACCOUNT_URL = 'http://localhost:8080/api/account';

  constructor(private httpClient: HttpClient) {
  }

  findById(idAccount: number): Observable<any> {
    return this.httpClient.get(this.ACCOUNT_URL + '/' + idAccount);
  }

  updatePassword(account: Account): Observable<any> {
    return this.httpClient.patch(this.ACCOUNT_URL + '/' + account.idAccount, account);
  }
}
