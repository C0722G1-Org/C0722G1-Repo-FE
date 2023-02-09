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
import {ActivatedRoute, Router} from "@angular/router";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  landTypeList: LandType[] = [];
  cityList: City[] = [];
  formSearch: FormGroup;
  page = 0;
  postList: PostListHome[] = [];
  postListTemp: PostListHome[] = [];
  totalPage = 0;
  mess = '';
  imageList: Image[] = [];
  image = '';
  code: number = 0;

  constructor(private postListService: PostListService,
              private fb: FormBuilder,
              private titleService: Title,
              private toastrService: ToastrService,
              private activatedRoute: ActivatedRoute,
              private router: Router) {
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
            this.checkCode(this.code);
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
        this.postList = [];
        this.mess = 'Không có dữ liệu.';
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
      this.checkCode(this.code);
    }
  }

  /**
   * Create by: SangNP
   * Date created: 04/02/2023
   * Function: to show less post
   * @return void
   */
  async showLess(): Promise<void> {
    this.page = 0;
    this.postList = [];
    await this.checkCode(this.code);
  }

  /**
   * Create by: SangNP
   * Date created: 04/02/2023
   * Function: take post list
   * @return void
   */
  async search(): Promise<void> {
    this.postList = await [];
    await this.checkCode(this.code);
  }

  /**
   * Create by: SangNP
   * Date created: 04/02/2023
   * Function: reset search
   * @return void
   */
  async resetSearch(): Promise<void> {
    this.formSearch.reset({
      area: [''],
      price: [''],
      landType: [''],
      city: [''],
      direction: ['']
    });
    this.postList = [];
    this.code = 0;
    this.page = 0;
    this.router.navigateByUrl("/home");
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
  getPostPageBuy(): void {
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
        this.postList = [];
        this.mess = 'Không có dữ liệu.';
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
  getPostPageSell(): void {
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
        this.postList = [];
        this.mess = 'Không có dữ liệu.';
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
  getPostPageRent(): void {
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
        this.postList = [];
        this.mess = 'Không có dữ liệu.';
      },
      () => {
      });
  }
  /**
   * Create by: SangNP
   * Date created: 09/02/2023
   * Function: check code before display data
   * @return void
   */
  checkCode(code: number): void{
      switch (code) {
        case 1:
          this.getPostPageSell();
          break;
        case 2:
          this.getPostPageRent();
          break;
        case 3:
          this.getPostPageBuy();
          break;
        default:
          this.getPostPage();
      }
  }
}
