import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {Post} from "../entity/post/post";

@Injectable({
  providedIn: 'root'
})
export class PostService {
  URL_POST_LIST = "http://localhost:8080/api/post"

  constructor(private _httpClient: HttpClient) {
  }

  findPostListByUserNameAccount(userNameAccount: string): Observable<Post[]> {
    return this._httpClient.get<Post[]>(this.URL_POST_LIST + "?customer.accountCustomer.userNameAccount_like=" + userNameAccount);
  }
}
