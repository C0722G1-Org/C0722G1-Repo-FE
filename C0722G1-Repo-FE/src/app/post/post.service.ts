import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {PortChart} from '../entity/post/port-chart';

@Injectable({
  providedIn: 'root'
})
export class PostService {
  /**
   * URL connect to spring boot to get list of posts and search for posts
   * Author: DatTQ  ;  Date:02/02/2023
   */
  urlPortChartSearch = 'http://localhost:8080/api/posts/charts-search';
  urlPortChartList = 'http://localhost:8080/api/posts/charts';

  constructor(private httpClient: HttpClient) {
  }

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
  }
}
