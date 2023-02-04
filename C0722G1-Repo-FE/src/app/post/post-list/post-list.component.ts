import {Component, OnInit} from '@angular/core';
import {LandType} from '../../entity/post/land-type';
import {PostListService} from './post-list.service';
import {City} from '../../entity/post/city';
import {Direction} from '../../entity/post/direction';

@Component({
  selector: 'app-post-list',
  templateUrl: './post-list.component.html',
  styleUrls: ['./post-list.component.css']
})
export class PostListComponent implements OnInit {
  landTypeList: LandType[] = [];
  cityList: City[] = [];
  directionList: Direction[] = [];

  constructor(private postListService: PostListService) {
  }

  ngOnInit(): void {
    this.getLandType();
    this.getCity();
    this.getDirection();
  }

  /**
   * Create by: SangNP
   * Date created: 03/02/2023
   * Function: take list land type
   * @return LandType[]
   */
  getLandType(): void {
    this.postListService.getLandType().subscribe(data => {
        this.landTypeList = data;
      }, error => {
      },
      () => {
      });
  }
  /**
   * Create by: SangNP
   * Date created: 03/02/2023
   * Function: take list city
   * @return City[]
   */
  getCity(): void {
    this.postListService.getCity().subscribe(data => {
        this.cityList = data;
      }, error => {
      },
      () => {
      });
  }
  /**
   * Create by: SangNP
   * Date created: 03/02/2023
   * Function: take directionList
   * @return Direction[]
   */
  getDirection(): void {
    this.postListService.getDirection().subscribe(data => {
        this.directionList = data;
      }, error => {
      },
      () => {
      });
  }

  search(direction: string, city: string, price: string, landType: string, area: string) {

  }
}
