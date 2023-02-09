import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {PagePostDto} from '../../entity/post/page-post-dto';

@Injectable({
  providedIn: 'root'
})
export class PostListApprovalService {
  constructor(private httpClient: HttpClient) {
  }

  getAllPostApproval(pageNumber: any): Observable<PagePostDto> {
    return this.httpClient.get<PagePostDto>('http://localhost:8080/api/post?page=' + pageNumber);
  }

  getPostApprovalsBySearch(demandTypeSearch: any, landTypeSearch: any, minPriceSearch: any, maxPriceSearch: any,
                           citySearch: any, districtSearch: any, wardsSearch: any, minAreaSearch: any, maxAreaSearch: any, pageNumber: any): Observable<PagePostDto> {
    return this.httpClient.get<PagePostDto>('http://localhost:8080/api/post?demandTypeSearch=' + demandTypeSearch + '&landTypeSearch='
      + landTypeSearch + '&minPriceSearch=' + minPriceSearch + '&maxPriceSearch=' + maxPriceSearch + '&citySearch='
      + citySearch + '&districtSearch=' + districtSearch + '&wardsSearch=' + wardsSearch + '&minAreaSearch=' + minAreaSearch + '&maxAreaSearch=' + maxAreaSearch + '&page=' + pageNumber);
  }

  deletePostById(id: number | undefined): any {
    return this.httpClient.delete('http://localhost:8080/api/post/delete/' + id);
  }

  approvalPostById(id: number | undefined): any {
    // @ts-ignore
    return this.httpClient.patch('http://localhost:8080/api/post/approval/' + id);
  }
}
