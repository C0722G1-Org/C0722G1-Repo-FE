import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {PagePostDto} from '../../dto/post/page-post-dto';

@Injectable({
  providedIn: 'root'
})
export class PostListCustomerService {
  URL_POST_LIST = 'http://localhost:8080/api/post/search-page';

  constructor(private _httpClient: HttpClient) {
  }

  /**
   * Created by: UyDD
   * Date Created: 03/02/2023
   * @param idCustomer
   * @param nameDemandTypeSearch
   * @param pageNumber
   * @return PagePostDto
   */

  getAllAndSearchWithRoleAdmin(idCustomer: string | null | undefined, nameDemandTypeSearch: string, pageNumber: number): Observable<PagePostDto> {
    return this._httpClient.get<PagePostDto>(this.URL_POST_LIST + '-admin' + '?nameDemandTypeSearch=' + nameDemandTypeSearch + '&idCustomer=' + idCustomer + '&page=' + pageNumber);
  }

  /**
   * Created by: UyDD
   * Date Created: 03/02/2023
   * @param idAccount
   * @param nameDemandTypeSearch
   * @param pageNumber
   * @return PagePostDto
   */
  getAllAndSearchWithRoleCustomer(idAccount: string | null | undefined, nameDemandTypeSearch: string, pageNumber: number): Observable<PagePostDto> {
    return this._httpClient.get<PagePostDto>(this.URL_POST_LIST + '-customer' + '?nameDemandTypeSearch=' + nameDemandTypeSearch + '&idAccount=' + idAccount + '&page=' + pageNumber);
  }

}
