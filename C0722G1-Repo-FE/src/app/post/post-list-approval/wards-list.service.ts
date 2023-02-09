import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Wards} from '../../entity/post/wards';

@Injectable({
  providedIn: 'root'
})
export class WardsListService {

  constructor(private httpClient: HttpClient) { }
  /**
   * Create by: NgocLV
   * Date created: 05/02/2023
   * Function: get all Wards
   *
   * return show all wards which have the same district
   */
  getAllWards(idDistrict: number): Observable<Wards[]>{
    return  this.httpClient.get<Wards[]>('http://localhost:8080/api/wards/list?idDistrict=' + idDistrict);
  }
}
