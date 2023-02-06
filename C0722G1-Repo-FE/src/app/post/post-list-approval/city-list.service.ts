import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {City} from '../../entity/post/city';

@Injectable({
  providedIn: 'root'
})
export class CityListService {

  constructor(private httpClient: HttpClient) { }
  /**
   * Create by: NgocLV
   * Date created: 05/02/2023
   * Function: get all City
   *
   * return all list city in database
   */
  getAllCity(): Observable<City[]>{
    return  this.httpClient.get<City[]>('http://localhost:8080/api/city');
  }
}
