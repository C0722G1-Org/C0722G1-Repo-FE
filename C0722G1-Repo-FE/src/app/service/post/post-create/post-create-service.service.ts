import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {FormBuilder} from '@angular/forms';
import {Observable} from 'rxjs';
import {DemandType} from '../../../entity/post/demand-type';
import {LandType} from '../../../entity/post/land-type';
import {Direction} from '../../../entity/post/direction';
import {City} from '../../../entity/post/city';
import {District} from '../../../entity/post/district';
import {Wards} from '../../../entity/post/wards';
import {CreatePostDto} from '../../../dto/post/post-create/create-post-dto';
import {BaseResponseCreatePost} from '../../../dto/post/post-create/base-response-create-post';
import {CreatePostDtoCustomer} from '../../../dto/post/post-create/create-post-dto-customer';

@Injectable({
  providedIn: 'root'
})
export class PostCreateServiceService {
  private URL_POST_CREATE = 'http://localhost:8080/api/post/create';
  private URL_DEMAND_TYPE = 'http://localhost:8080/api/public/demand-type';
  private URL_DIRECTION = 'http://localhost:8080/api/public/direction';
  private URL_LAND_TYPE = 'http://localhost:8080/api/public/land-type';
  private URL_CITY = 'http://localhost:8080/api/public/city';
  private URL_DISTRICTS = 'http://localhost:8080/api/public/districts';
  private URL_WARDS = 'http://localhost:8080/api/public/wards';
  private URL_GET_ID_CODE_CUSTOMER = 'http://localhost:8080/api/post/customer/login';

  constructor(private httpClient: HttpClient) {
  }

  getDemandTypeList(): Observable<DemandType[]> {
    return this.httpClient.get<DemandType[]>(this.URL_DEMAND_TYPE);
  }

  getLandTypeList(): Observable<LandType[]> {
    return this.httpClient.get<LandType[]>(this.URL_LAND_TYPE);
  }

  getDirectionList(): Observable<Direction[]> {
    return this.httpClient.get<Direction[]>(this.URL_DIRECTION);
  }

  getCityList(): Observable<City[]> {
    return this.httpClient.get<City[]>(this.URL_CITY);
  }

  getDistrictsList(): Observable<District[]> {
    return this.httpClient.get<District[]>(this.URL_DISTRICTS);
  }

  getWardsList(): Observable<Wards[]> {
    return this.httpClient.get<Wards[]>(this.URL_WARDS);
  }

  savePost(createPostDto: CreatePostDto): Observable<BaseResponseCreatePost> {
    return this.httpClient.post<BaseResponseCreatePost>(this.URL_POST_CREATE, createPostDto);
  }

  getIdAndCodeCustomer(idAccount: number): Observable<CreatePostDtoCustomer> {
    return this.httpClient.post<CreatePostDtoCustomer>(this.URL_GET_ID_CODE_CUSTOMER, idAccount);
  }
}
