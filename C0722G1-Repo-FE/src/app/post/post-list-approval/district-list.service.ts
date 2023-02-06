import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {District} from '../../entity/post/district';

@Injectable({
  providedIn: 'root'
})
export class DistrictListService {
  constructor(private httpClient: HttpClient) {
  }

  /**
   * Create by: NgocLV
   * Date created: 05/02/2023
   * Function: get all district
   *
   * return show all district which have the same city
   */
  getAllDistrict(idCity: number): Observable<District[]> {
    return this.httpClient.get<District[]>('http://localhost:8080/api/districts/list?idCity=' + idCity);
  }
}
