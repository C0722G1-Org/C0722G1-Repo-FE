import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {LandType} from '../../entity/post/land-type';
import {Observable} from 'rxjs';
import {Direction} from '../../entity/post/direction';
import {Image} from '../../entity/post/image';

class CityType {
}

@Injectable({
  providedIn: 'root'
})
export class PostListService {

​
  constructor(private httpClient: HttpClient) {
  }
​
  /**
   * Create by: SangNP
   * Date created: 03/02/2023
   * Function: take list land type
   * @return LandType[]
   */
  getLandType(): Observable<LandType[]> {
    return this.httpClient.get<LandType[]>('http://localhost:8080/api/public/home/landType');
  }
​
  /**
   * Create by: SangNP
   * Date created: 03/02/2023
   * Function: take list city
   * @return City[]
   */
  getCity(): Observable<CityType[]> {
    return this.httpClient.get<CityType[]>('http://localhost:8080/api/public/home/city');
  }
​
  /**
   * Create by: SangNP
   * Date created: 03/02/2023
   * Function: take directionList
   * @return Direction[]
   */
  getDirection(): Observable<Direction[]> {
    return this.httpClient.get<Direction[]>('http://localhost:8080/api/public/home/direction');
  }
​
  /**
   * Create by: SangNP
   * Date created: 04/02/2023
   * Function: take post list after search
   * @return Page<Post>
   */
  getPostPage(area: string, price: string, landType: string, direction: string, city: string, page: number): Observable<any> {
    return this.httpClient.get('http://localhost:8080/api/public/home/list?area=' + area + '&price=' + price + '&landType=' + landType + '&direction=' + direction + '&city=' + city + '&page=' + page);
  }
​
  searchByLandType(landType: string | null): Observable<any> {
    return this.httpClient.get('http://localhost:8080/api/public/home/list?landType=' + landType);
  }
​
  /**
   * Create by: SangNP
   * Date created: 03/02/2023
   * Function: take image List by post id
   * @return Image[]
   */
  getImageByIdPost(id: number | undefined): Observable<Image[]> {
    return this.httpClient.get<Image[]>('http://localhost:8080/api/public/home/image?id=' + id);
  }
​
  searchByDirection(direction: string | null): Observable<any> {
    return this.httpClient.get('http://localhost:8080/api/public/home/list?direction=' + direction);
  }
​
  searchByCity(city: string | null): Observable<any> {
    return this.httpClient.get('http://localhost:8080/api/public/home/list?city=' + city);
  }
​
  /**
   * Create by: SangNP
   * Date created: 04/02/2023
   * Function: take post list after search for buy
   * @return Page<Post>
   */
  getPostPageBuy(area: string, price: string, landType: string, direction: string, city: string, page: number): Observable<any> {
    return this.httpClient.get('http://localhost:8080/api/public/home/list/buy?area=' + area + '&price=' + price + '&landType=' + landType + '&direction=' + direction + '&city=' + city + '&page=' + page);
  }
​
  /**
   * Create by: SangNP
   * Date created: 04/02/2023
   * Function: take post list after search for sell
   * @return Page<Post>
   */
  getPostPageSell(area: string, price: string, landType: string, direction: string, city: string, page: number): Observable<any> {
    // tslint:disable-next-line:max-line-length
    return this.httpClient.get('http://localhost:8080/api/public/home/list/sell?area=' + area + '&price=' + price + '&landType=' + landType + '&direction=' + direction + '&city=' + city + '&page=' + page);
  }
​
  /**
   * Create by: SangNP
   * Date created: 04/02/2023
   * Function: take post list after search for rent
   * @return Page<Post>
   */
  getPostPageRent(area: string, price: string, landType: string, direction: string, city: string, page: number): Observable<any> {
    // tslint:disable-next-line:max-line-length
    return this.httpClient.get('http://localhost:8080/api/public/home/list/rent?area=' + area + '&price=' + price + '&landType=' + landType + '&direction=' + direction + '&city=' + city + '&page=' + page);
  }
}
