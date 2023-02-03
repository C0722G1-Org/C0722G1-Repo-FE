/* tslint:disable */
import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {PostApproval} from '../../entity/post/post-approval';
import {PagePostDto} from '../../entity/post/page-post-dto';

@Injectable({
  providedIn: 'root'
})
export class PostListApprovalService {
  constructor(private httpClient: HttpClient) {}
  getAllPostApproval(pageNumber: any): Observable<PagePostDto>{
    return this.httpClient.get<PagePostDto>('http://localhost:8080/api/posts?page=' + pageNumber);
  }
  deletePostById(id: number | undefined){
    return this.httpClient.delete('http://localhost:8080/api/posts/delete/' + id);
  }
  approvalPostById(id: number | undefined){
    return this.httpClient.delete('http://localhost:8080/api/posts/approval/' + id);
  }
}
