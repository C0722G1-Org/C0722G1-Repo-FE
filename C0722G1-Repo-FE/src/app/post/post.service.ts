import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {PortChart} from '../entity/post/port-chart';

@Injectable({
  providedIn: 'root'
})
export class PostService {
  urlPortChartSearch = 'http://localhost:8080/api/post/search';
  urlPortChartList = 'http://localhost:8080/api/post';

  constructor(private httpClient: HttpClient) {
  }

  displayListChart(): Observable<PortChart[]> {
    return this.httpClient.get<PortChart[]>(this.urlPortChartList);
  }

  searchChart(month: string, year: string): Observable<PortChart[]> {
    return this.httpClient.get<PortChart[]>(this.urlPortChartSearch + '?year=' + year + '&month=' + month);
  }
}
