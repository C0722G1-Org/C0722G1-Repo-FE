import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {PortChart} from '../entity/post/port-chart';

@Injectable({
  providedIn: 'root'
})
export class PostService {
  URL_POST_LIST = 'http://localhost:8080/api/post';
  /**
   * URL connect to spring boot to get list of posts and search for posts
   * Author: DatTQ  ;  Date:02/02/2023
   */
  urlPortChartSearch = 'http://localhost:8080/api/post/charts-search';
  urlPortChartList = 'http://localhost:8080/api/post/charts';


  constructor(private httpClient: HttpClient) {
  }

  /**
   * Function display list PortChart.Method use: GET
   * Use Observable && Service Module: HttpClient to execute the method
   * Send request from Angular to Spring Boot to get down checked and return the List PortChart displayed in HTML
   * @param: month: No
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
    return this.httpClient.get<any>('http://localhost:8080/api/public/home/detail?id=' + id);
  }
  /**
   * Method uses:
   * Send a request to backend API to get a list of image by parameter Id
   * Created by: HuyDN
   * Created date: 04/02/2023
   *
   * @param idPost: a Post' id
   * @return a Observable that contain a Post object can be showed on Post detail screen
   */
  findImageByIdPost(idPost: number): Observable<any> {
    return this.httpClient.get<any>('http://localhost:8080/api/public/home/image?id=' + idPost);
  }
  /**
   * Method uses:
   * Send a request to backend API to change Post's status to succeeded
   * Created by: HuyDN
   * Created date: 04/02/2023
   *
   * @param idPost: a Post' id
   * @return a Observable that contain a Post object can be showed on Post detail screen
   */
  succeedConfirm(idPost: number | undefined): Observable<any> {
    return this.httpClient.patch('http://localhost:8080/api/post/confirm?id=', idPost);
  }

  /**
   * Created by: HuyDN
   * Created date: 04/02/2023
   *
   * @param idCustomer: a customer' id
   * @return a Observable that contain a Post object can be showed on Post detail screen
   */

  getAccountId(idCustomer: number | undefined): Observable<any> {
    return this.httpClient.get<any>('http://localhost:8080/api/public/home/detail/account-id?id=' + idCustomer);
  }
}
