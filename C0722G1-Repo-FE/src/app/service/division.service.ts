import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Division} from '../entity/employee/division';

@Injectable({
  providedIn: 'root'
})
export class DivisionService {

  URL_DIVISION = 'http://localhost:8080/api/divisions';

  constructor(private httpClient: HttpClient) {
  }

  /**
   * Create by: NhanUQ
   * Date created: 03/02/2023
   * Function: get list employee from BE
   * @return Observable Division[]
   */
  getAllDivision(): Observable<Division[]> {
    return this.httpClient.get<Division[]>(this.URL_DIVISION);
  }
}
