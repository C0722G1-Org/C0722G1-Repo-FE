import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {PostDetail} from '../entity/post/post-detail';
import {HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class PostService {

  constructor(private httpClient: HttpClient) {
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

  findImageByIdPost(idPost: number): Observable<any> {
    return this.httpClient.get<any>('http://localhost:8080/api/public/home/image?id=' + idPost);
  }

  succeedConfirm(idPost: number | undefined): Observable<any> {
    return this.httpClient.patch('http://localhost:8080/api/post/confirm?id=', idPost);
  }
}
