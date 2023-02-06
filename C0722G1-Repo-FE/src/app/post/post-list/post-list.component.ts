import {Component, OnInit} from '@angular/core';
import {LandType} from '../../entity/post/land-type';
import {PostListService} from './post-list.service';
import {City} from '../../entity/post/city';
import {Direction} from '../../entity/post/direction';
import {FormBuilder, FormGroup} from '@angular/forms';
import {PostListHome} from '../../entity/post/post-list-home';
import {Image} from '../../entity/post/image';
import {Title} from '@angular/platform-browser';
import {ToastrService} from 'ngx-toastr';

@Component({
  selector: 'app-post-list',
  templateUrl: './post-list.component.html',
  styleUrls: ['./post-list.component.css']
})
export class PostListComponent implements OnInit {
  landTypeList: LandType[] = [];
  cityList: City[] = [];
  directionList: Direction[] = [];
  formSearch: FormGroup;
  page = 0;
  postList: PostListHome[] = [];
  postListTemp: PostListHome[] = [];
  totalPage = 0;
  mess = '';
  imageList: Image[] = [];
  image = '';

  constructor(private postListService: PostListService,
              private fb: FormBuilder,
              private titleService: Title, private toastrService: ToastrService) {
    this.titleService.setTitle('home');
    this.formSearch = this.fb.group({
      area: [''],
      price: [''],
      landType: [''],
      city: [''],
      direction: ['']
    });
  }

  ngOnInit(): void {
    this.getLandType();
    this.getCity();
    this.getDirection();
    this.getPostPage();
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

  /**
   * Create by: SangNP
   * Date created: 03/02/2023
   * Function: take image List by post id
   * @return Image[]
   */
  getImageByIdPost(list: PostListHome[]): void {
    for (let i = 0; i < list.length; i++) {
      this.postListService.getImageByIdPost(list[i].idPost).subscribe(data => {
          this.imageList = data;
          if (this.imageList.length > 0) {
            list[i].imageURL = this.imageList[0].url;
          }
        }, error => {
        },
        () => {
        }
      );
    }
  }

  /**
   * Create by: SangNP
   * Date created: 04/02/2023
   * Function: take post list
   * @return void
   */
  getPostPage(): void {
    this.postListService.getPostPage(
      this.formSearch.controls.area.value,
      this.formSearch.controls.price.value,
      this.formSearch.controls.landType.value,
      this.formSearch.controls.direction.value,
      this.formSearch.controls.city.value, this.page).subscribe(data => {
        this.mess = '';
        this.postListTemp = data.content;
        this.totalPage = data.totalPages;
        this.page = data.pageable.pageNumber;
        if (this.postListTemp.length > 0) {
          this.getImageByIdPost(this.postListTemp);
        }
        this.postList = this.postList.concat(this.postListTemp);
      }, error => {
        this.mess = 'Không có dữ liệu';
      },
      () => {
      });
  }

  /**
   * Create by: SangNP
   * Date created: 04/02/2023
   * Function: to show more post
   * @return void
   */
  showMore(): void {
    if (this.page < this.totalPage - 1) {
      this.page = this.page + 1;
      this.getPostPage();
    }
  }

  /**
   * Create by: SangNP
   * Date created: 04/02/2023
   * Function: to show less post
   * @return void
   */
  showLess(): void {
    this.page = 0;
    this.postListService.getPostPage(
      this.formSearch.controls.area.value,
      this.formSearch.controls.price.value,
      this.formSearch.controls.landType.value,
      this.formSearch.controls.direction.value,
      this.formSearch.controls.city.value, this.page).subscribe(data => {
        this.mess = '';
        this.postListTemp = data.content;
        this.totalPage = data.totalPages;
        this.page = data.pageable.pageNumber;
        if (this.postListTemp.length > 0) {
          this.getImageByIdPost(this.postListTemp);
        }
        this.postList = [];
        this.postList = this.postList.concat(this.postListTemp);
      }, error => {
        this.mess = 'Không có dữ liệu';
      },
      () => {
      });
  }

  /**
   * Create by: SangNP
   * Date created: 04/02/2023
   * Function: take post list
   * @return void
   */
  search(): void {
    this.postListService.getPostPage(
      this.formSearch.controls.area.value,
      this.formSearch.controls.price.value,
      this.formSearch.controls.landType.value,
      this.formSearch.controls.direction.value,
      this.formSearch.controls.city.value, this.page).subscribe(data => {
        this.mess = '';
        this.postListTemp = data.content;
        this.postList = [];
        this.totalPage = data.totalPages;
        this.page = data.pageable.pageNumber;
        if (this.postListTemp.length > 0) {
          this.getImageByIdPost(this.postListTemp);
        }
        this.postList = this.postList.concat(this.postListTemp);
        this.success('Tìm kiếm thành công');
      }, error => {
        this.mess = 'Không có dữ liệu';
        this.error('Tìm kiếm thất bại');
      },
      () => {
      });
  }

  /**
   * Create by: SangNP
   * Date created: 04/02/2023
   * Function: reset search
   * @return void
   */
  resetSearch(): void {
    location.reload();
  }

  /**
   * Create by: SangNP
   * Date created: 04/02/2023
   * Function: success for toartr
   * @return void
   */
  success(mess: string): void {
    this.toastrService.success(mess);
  }

  /**
   * Create by: SangNP
   * Date created: 04/02/2023
   * Function: error for toartr
   * @return void
   */
  error(mess: string): void {
    this.toastrService.error(mess);
  }
}
