import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {FormBuilder} from '@angular/forms';

@Injectable({
  providedIn: 'root'
})
export class PostCreateServiceService {
  URL_POST_CREATE = 'http://localhost:8080/api/post/create';
  URL_DEMAND_TYPE = 'https://localhost:8080/api/demand';
  URL_DIRECTION = 'https://localhost:8080/api/direction';
  URL_LAND_TYPE = 'https://localhost:8080/api/land-type';

  constructor(httpClient: HttpClient) {
  }
}
