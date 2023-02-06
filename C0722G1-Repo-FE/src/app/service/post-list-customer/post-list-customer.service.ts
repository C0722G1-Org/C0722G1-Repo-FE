import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {Post} from "../../entity/post/post";
import {PagePostDto} from "../../dto/page-post-dto";

@Injectable({
  providedIn: 'root'
})
export class PostListCustomerService {

  URL_POST_LIST = "http://localhost:8080/api/post/search-page"

  constructor(private _httpClient: HttpClient) {
  }

  /**
   * Created by: UyDD
   * Date Created: 03/02/2023
   * @param idAccount
   * @param nameDemandTypeSearch
   * @param pageNumber
   * @return PagePostDto
   */
  getAllAndSearch(idAccount: string|null|undefined, nameDemandTypeSearch: string, pageNumber: number): Observable<PagePostDto> {
    return this._httpClient.get<PagePostDto>(this.URL_POST_LIST +"&nameDemandTypeSearch=" + nameDemandTypeSearch + "&idAccount=" + idAccount + "?page="+pageNumber);
  }
}
