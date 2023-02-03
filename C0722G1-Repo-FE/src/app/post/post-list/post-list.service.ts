import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {LandType} from '../../entity/post/land-type';
import {Observable} from 'rxjs';
import {Direction} from '../../entity/post/direction';

class CityType {
}

@Injectable({
  providedIn: 'root'
})
export class PostListService {

  constructor(private httpClient: HttpClient) {
  }
  /**
   * Create by: SangNP
   * Date created: 03/02/2023
   * Function: take list land type
   * @return LandType[]
   */
  getLandType(): Observable<LandType[]> {
    return this.httpClient.get<LandType[]>('http://localhost:8080/api/land-type');
  }
  /**
   * Create by: SangNP
   * Date created: 03/02/2023
   * Function: take list city
   * @return City[]
   */
  getCity(): Observable<CityType[]> {
    return this.httpClient.get<CityType[]>('http://localhost:8080/api/city');
  }
  /**
   * Create by: SangNP
   * Date created: 03/02/2023
   * Function: take directionList
   * @return Direction[]
   */
  getDirection(): Observable<Direction[]> {
    return this.httpClient.get<Direction[]>('http://localhost:8080/api/direction');
  }
}
