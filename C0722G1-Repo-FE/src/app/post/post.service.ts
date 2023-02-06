import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {Post} from "../entity/post/post";

@Injectable({
  providedIn: 'root'
})
export class PostService {
  URL_POST_LIST = "http://localhost:8080/api/post"
}
