import {Component, OnInit} from '@angular/core';
import {ToastrService} from 'ngx-toastr';
import {LandType} from '../../entity/post/land-type';
import {City} from '../../entity/post/city';
import {Direction} from '../../entity/post/direction';
import {FormBuilder, FormGroup} from '@angular/forms';
import {PostListHome} from '../../entity/post/post-list-home';
import {Image} from '../../entity/post/image';
import {PostListService} from '../../post/post-list/post-list.service';
import {Title} from '@angular/platform-browser';
import {ActivatedRoute} from "@angular/router";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
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
  code: number | undefined = 0;

  constructor(private postListService: PostListService,
              private fb: FormBuilder,
              private titleService: Title,
              private toastrService: ToastrService,
              private activatedRoute: ActivatedRoute) {
    this.titleService.setTitle('Trang chủ');
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
        this.activatedRoute.paramMap.subscribe(data => {
          const code = data.get('code');
          if (code !== null) {
            this.postList = [];
            this.code = parseInt(code);
            switch (this.code) {
              case 1:
                this.searchSellPostList();
                this.code = 1;
                break;
              case 2:
                this.searchRentPostList();
                this.code = 2;
                break;
              case 3:
                this.searchBuyPostList();
                this.code = 3;
                break;
              default:
                this.getPostPage();
                this.code = 0;
            }
          }
        }, error1 => {
        });
      }, error => {
        this.mess = 'Không có dữ liệu';
      },
      () => {
      });
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
      switch (this.code) {
        case 1:
          this.searchSellPostList();
          break;
        case 2:
          this.searchRentPostList();
          break;
        case 3:
          this.searchBuyPostList();
          break;
        default:
          this.getPostPage();
      }
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
    switch (this.code) {
      case 1:
        this.postListService.getPostPageSell(
          this.formSearch.controls.area.value,
          this.formSearch.controls.price.value,
          this.formSearch.controls.landType.value,
          this.formSearch.controls.direction.value,
          this.formSearch.controls.city.value, this.page).subscribe(data => {
            this.code = 1;
            this.mess = '';
            this.postListTemp = data.content;
            this.postList = [];
            this.totalPage = data.totalPages;
            this.page = data.pageable.pageNumber;
            if (this.postListTemp.length > 0) {
              this.getImageByIdPost(this.postListTemp);
            }
            this.postList = this.postList.concat(this.postListTemp);
          }, error => {
            this.postList = [];
          },
          () => {
          });
        break;
      case 2:
        this.postListService.getPostPageRent(
          this.formSearch.controls.area.value,
          this.formSearch.controls.price.value,
          this.formSearch.controls.landType.value,
          this.formSearch.controls.direction.value,
          this.formSearch.controls.city.value, this.page).subscribe(data => {
            this.code = 2;
            this.mess = '';
            this.postListTemp = data.content;
            this.postList = [];
            this.totalPage = data.totalPages;
            this.page = data.pageable.pageNumber;
            if (this.postListTemp.length > 0) {
              this.getImageByIdPost(this.postListTemp);
            }
            this.postList = this.postList.concat(this.postListTemp);
          }, error => {
            this.postList = [];
          },
          () => {
          });
        break;
      case 3:
        this.postListService.getPostPageBuy(
          this.formSearch.controls.area.value,
          this.formSearch.controls.price.value,
          this.formSearch.controls.landType.value,
          this.formSearch.controls.direction.value,
          this.formSearch.controls.city.value, this.page).subscribe(data => {
            this.code = 3;
            this.mess = '';
            this.postListTemp = data.content;
            this.postList = [];
            this.totalPage = data.totalPages;
            this.page = data.pageable.pageNumber;
            if (this.postListTemp.length > 0) {
              this.getImageByIdPost(this.postListTemp);
            }
            this.postList = this.postList.concat(this.postListTemp);
          }, error => {
            this.postList = [];
          },
          () => {
          });
        break;
      default:
        this.postListService.getPostPage(
          this.formSearch.controls.area.value,
          this.formSearch.controls.price.value,
          this.formSearch.controls.landType.value,
          this.formSearch.controls.direction.value,
          this.formSearch.controls.city.value, this.page).subscribe(data => {
            this.code = 0;
            this.mess = '';
            this.postListTemp = data.content;
            this.postList = [];
            this.totalPage = data.totalPages;
            this.page = data.pageable.pageNumber;
            if (this.postListTemp.length > 0) {
              this.getImageByIdPost(this.postListTemp);
            }
            this.postList = this.postList.concat(this.postListTemp);
          }, error => {
            this.postList = [];
          },
          () => {
          });
    }
  }

  /**
   * Create by: SangNP
   * Date created: 04/02/2023
   * Function: take post list
   * @return void
   */
  search(): void {
    switch (this.code) {
      case 1:
        this.postListService.getPostPageSell(
          this.formSearch.controls.area.value,
          this.formSearch.controls.price.value,
          this.formSearch.controls.landType.value,
          this.formSearch.controls.direction.value,
          this.formSearch.controls.city.value, this.page).subscribe(data => {
            this.code = 1;
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
            this.postList = [];
            this.mess = 'Không có dữ liệu';
            this.error('Tìm kiếm thất bại');
          },
          () => {
          });
        break;
      case 2:
        this.postListService.getPostPageRent(
          this.formSearch.controls.area.value,
          this.formSearch.controls.price.value,
          this.formSearch.controls.landType.value,
          this.formSearch.controls.direction.value,
          this.formSearch.controls.city.value, this.page).subscribe(data => {
            this.code = 2;
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
            this.postList = [];
            this.mess = 'Không có dữ liệu';
            this.error('Tìm kiếm thất bại');
          },
          () => {
          });
        break;
      case 3:
        this.postListService.getPostPageBuy(
          this.formSearch.controls.area.value,
          this.formSearch.controls.price.value,
          this.formSearch.controls.landType.value,
          this.formSearch.controls.direction.value,
          this.formSearch.controls.city.value, this.page).subscribe(data => {
            this.code = 3;
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
            this.postList = [];
            this.mess = 'Không có dữ liệu';
            this.error('Tìm kiếm thất bại');
          },
          () => {
          });
        break;
      default:
        this.postListService.getPostPage(
          this.formSearch.controls.area.value,
          this.formSearch.controls.price.value,
          this.formSearch.controls.landType.value,
          this.formSearch.controls.direction.value,
          this.formSearch.controls.city.value, this.page).subscribe(data => {
            this.code = 0;
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
            this.postList = [];
            this.mess = 'Không có dữ liệu';
            this.error('Tìm kiếm thất bại');
          },
          () => {
          });
    }
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

  /**
   * Create by: SangNP
   * Date created: 04/02/2023
   * Function: take post list buy
   * @return void
   */
  searchBuyPostList(): void {
    this.postListService.getPostPageBuy(
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
   * Function: take post list sell
   * @return void
   */
  searchSellPostList(): void {
    this.postListService.getPostPageSell(
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
   * Function: take post list rent
   * @return void
   */
  searchRentPostList(): void {
    this.postListService.getPostPageRent(
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
}
