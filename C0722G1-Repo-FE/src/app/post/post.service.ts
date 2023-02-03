import {Injectable} from '@angular/core';

import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {Post} from "../entity/post/post";
import {PortChart} from '../entity/post/port-chart';
import {PostDetail} from '../entity/post/post-detail';

@Injectable({
  providedIn: 'root'
})
export class PostService {
  URL_POST_LIST = "http://localhost:8080/api/post"
  /**
   * URL connect to spring boot to get list of posts and search for posts
   * Author: DatTQ  ;  Date:02/02/2023
   */
  urlPortChartSearch = 'http://localhost:8080/api/post/search';
  urlPortChartList = 'http://localhost:8080/api/post';
  
  constructor(private httpClient: HttpClient) {
  }
  
  findPostListByUserNameAccount(userNameAccount: string): Observable<Post[]> {
    return this._httpClient.get<Post[]>(this.URL_POST_LIST + "?customer.accountCustomer.userNameAccount_like=" + userNameAccount);
  }

  findByNameDemandType(value: string): Observable<Post[]> {
    return this._httpClient.get<Post[]>(this.URL_POST_LIST + "?demandType.nameDemandType_like=" + value);

/**
   * Function display list PortChart.Method use: GET
   * Use Observable && Service Module: HttpClient to execute the method
   * Send request from Angular to Spring Boot to get down checked and return the List PortChart displayed in HTML
   * @param: NO
   * Author: DatTQ  ;  Date:02/02/2023;
   */
  displayListChart(): Observable<PortChart[]> {
    return this.httpClient.get<PortChart[]>(this.urlPortChartList);
  }
  /**
   * Function search list PortChart by year and month.Method use: GET
   * Use Observable && Service Module: HttpClient to execute the method
   * Send request from Angular to Spring Boot to get down checked and return the List PortChart displayed in HTML
   * @param: month: string, year: string
   * Author: DatTQ  ;  Date:02/02/2023;
   */
  searchChart(month: string, year: string): Observable<PortChart[]> {
    return this.httpClient.get<PortChart[]>(this.urlPortChartSearch + '?year=' + year + '&month=' + month);
    
  /**
   * Method uses:
   * Send a request to backend API to get a Post by parameter Id
   * Created by: HuyDN
   * Created date: 02/02/2023
   *
   * @param id: a Post' id
   * @return a Observable that contain a Post object can be showed on Post detail screen
   */
  findPostById(id: number): Observable<any> {
    return this.httpClient.get<PostDetail>('http://localhost:8080/package/' + id);
  }
}
