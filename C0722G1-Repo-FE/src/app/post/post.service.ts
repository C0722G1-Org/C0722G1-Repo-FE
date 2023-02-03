import {Injectable} from '@angular/core';

import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {Post} from "../entity/post/post";
import {PortChart} from '../entity/post/port-chart';


@Injectable({
  providedIn: 'root'
})
export class PostService {

  URL_POST_LIST = "http://localhost:8080/api/post"
  urlPortChartSearch = 'http://localhost:8080/api/post/search';
  urlPortChartList = 'http://localhost:8080/api/post';
  
  constructor(private _httpClient: HttpClient) {
  }

  findPostListByUserNameAccount(userNameAccount: string): Observable<Post[]> {
    return this._httpClient.get<Post[]>(this.URL_POST_LIST + "?customer.accountCustomer.userNameAccount_like=" + userNameAccount);
  }

  findByNameDemandType(value: string): Observable<Post[]> {
    return this._httpClient.get<Post[]>(this.URL_POST_LIST + "?demandType.nameDemandType_like=" + value);

  displayListChart(): Observable<PortChart[]> {
    return this.httpClient.get<PortChart[]>(this.urlPortChartList);
  }

  searchChart(month: string, year: string): Observable<PortChart[]> {
    return this.httpClient.get<PortChart[]>(this.urlPortChartSearch + '?year=' + year + '&month=' + month);
  }
}
