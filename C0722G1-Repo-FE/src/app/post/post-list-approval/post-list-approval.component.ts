import {Component, OnInit} from '@angular/core';
import {PagePostDto} from '../../entity/post/page-post-dto';
import {PostApproval} from '../../entity/post/post-approval';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {City} from '../../entity/post/city';
import {District} from '../../entity/post/district';
import {Wards} from '../../entity/post/wards';
import {PostListApprovalService} from './post-list-approval.service';
import {ToastrService} from 'ngx-toastr';
import {CityListService} from './city-list.service';
import {DistrictListService} from './district-list.service';
import {WardsListService} from './wards-list.service';

@Component({
  selector: 'app-post-list-approval',
  templateUrl: './post-list-approval.component.html',
  styleUrls: ['./post-list-approval.component.css']
})
export class PostListApprovalComponent implements OnInit {

  postApprovalList!: PagePostDto;
  temp: PostApproval = {};
  postApprovalSearch!: FormGroup;
  cityList: City[] = [];
  districtList: District[] = [];
  wardsList: Wards[] = [];
  flag = false;

  constructor(private postListApprovalService: PostListApprovalService,
              private toastrService: ToastrService,
              private cityListService: CityListService,
              private districtListService: DistrictListService,
              private wardsListService: WardsListService) {
  }

  /**
   * Create by: NgocLV
   * Date created: 05/02/2023
   * Function: get district
   *
   * return show all district which have the same city
   */

  getDistrict(): void {
    this.getAllDistrict(this.postApprovalSearch.value.citySearch);
    this.postApprovalSearch.value.districtSearch = '';
    this.getAllWards(0);
  }

  /**
   * Create by: NgocLV
   * Date created: 05/02/2023
   * Function: get Wards
   *
   * return show all wards which have the same district
   */
  getWards(): void {
    this.getAllWards(this.postApprovalSearch.value.districtSearch);
  }

  ngOnInit(): void {
    this.getPagePost(0);
    this.postApprovalSearch = new FormGroup({
      minPriceSearch: new FormControl('', [Validators.min(0)]),
      maxPriceSearch: new FormControl('', [Validators.min(0)]),
      demandTypeSearch: new FormControl(''),
      landTypeSearch: new FormControl(''),
      citySearch: new FormControl(''),
      districtSearch: new FormControl(''),
      wardsSearch: new FormControl('')
    }, this.validateMaxPriceSearch);
    this.getAllCity();
  }

  /**
   * Create by: NgocLV
   * Date created: 05/02/2023
   * Function: validate price search
   *
   * compare value of minPrice and maxPrice when search
   */
// tslint:disable-next-line:typedef
  validateMaxPriceSearch(postApprovalSearch: any) {
    const minPriceSearch = postApprovalSearch.controls.minPriceSearch.value;
    const maxPriceSearch = postApprovalSearch.controls.maxPriceSearch.value;
    console.log(minPriceSearch);
    console.log(maxPriceSearch);
    return (minPriceSearch > maxPriceSearch) ? {priceCompare: true} : null;
  }

  /**
   * Create by: NgocLV
   * Date created: 05/02/2023
   * Function: get page post
   *
   * @return get all post when access this page
   */

  getPagePost(pageNumber: number): void {
    this.postListApprovalService.getAllPostApproval(pageNumber).subscribe(next => {
      this.postApprovalList = next;
    }, error => {
      console.log('Lỗi truy xuất');
    });
  }

  /**
   * Create by: NgocLV
   * Date created: 05/02/2023
   * Function: get search page post
   *
   * @return return this page which all element which is math with value is selected when search
   */
// tslint:disable-next-line:max-line-length
  getSearchPagePost(demandTypeSearch: any, landTypeSearch: any, minPriceSearch: any, maxPriceSearch: any, citySearch: any, districtSearch: any, wardsSearch: any, pageNumber: any): void {
    // tslint:disable-next-line:max-line-length
    this.postListApprovalService.getPostApprovalsBySearch(demandTypeSearch, landTypeSearch, minPriceSearch, maxPriceSearch, citySearch, districtSearch, wardsSearch, pageNumber).subscribe(data => {
      this.postApprovalList = data;
    });
  }

  /**
   * Create by: NgocLV
   * Date created: 05/02/2023
   * Function: onsubmit
   *
   * @return return this page which all element which is math with value is selected when search
   */
// tslint:disable-next-line:typedef
  onSubmit() {
    if (this.postApprovalSearch.valid) {
      if (this.postApprovalSearch.value.minPriceSearch == null && this.postApprovalSearch.value.maxPriceSearch == null) {
        this.getSearchPagePost(this.postApprovalSearch.value.demandTypeSearch,
          this.postApprovalSearch.value.landTypeSearch,
          '',
          '',
          this.postApprovalSearch.value.citySearch,
          this.postApprovalSearch.value.districtSearch,
          this.postApprovalSearch.value.wardsSearch, 0);
      } else if (this.postApprovalSearch.value.minPriceSearch == null) {
        this.getSearchPagePost(this.postApprovalSearch.value.demandTypeSearch,
          this.postApprovalSearch.value.landTypeSearch,
          '',
          this.postApprovalSearch.value.maxPriceSearch,
          this.postApprovalSearch.value.citySearch,
          this.postApprovalSearch.value.districtSearch,
          this.postApprovalSearch.value.wardsSearch, 0);
      } else {
        this.getSearchPagePost(this.postApprovalSearch.value.demandTypeSearch,
          this.postApprovalSearch.value.landTypeSearch,
          this.postApprovalSearch.value.minPriceSearch,
          this.postApprovalSearch.value.maxPriceSearch,
          this.postApprovalSearch.value.citySearch,
          this.postApprovalSearch.value.districtSearch,
          this.postApprovalSearch.value.wardsSearch, 0);
      }
    }
  }

  /**
   * Create by: NgocLV
   * Date created: 05/02/2023
   * Function: go to page
   *
   * @return return the page which is choose
   */

  gotoPage(pageNumber: number): void {
    this.getPagePost(pageNumber);
  }

  /**
   * Create by: NgocLV
   * Date created: 05/02/2023
   * Function: reload
   *
   * @return return this page after deleted or approval for element
   */
// tslint:disable-next-line:typedef
  reload() {
    this.getPagePost(0);
  }

  /**
   * Create by: NgocLV
   * Date created: 05/02/2023
   * Function: get list city
   *
   * @return HttpStatus.OK if json list city of Việt Nam
   */
  getAllCity(): void {
    this.cityListService.getAllCity().subscribe(data => {
      this.cityList = data;
    }, error => {
      console.log('Lỗi truy xuất');
    }, () => {
    });
  }

  /**
   * Create by: NgocLV
   * Date created: 05/02/2023
   * Function: get list district
   *
   * @return HttpStatus.OK if json list district in one city of Việt Nam
   */
  getAllDistrict(idCity: number): void {
    this.districtListService.getAllDistrict(idCity).subscribe(data => {
      this.districtList = data;
      console.log(this.districtList);
    }, error => {
      console.log('Lỗi truy xuất');
    }, () => {
    });
  }

  /**
   * Create by: NgocLV
   * Date created: 05/02/2023
   * Function: get list wards
   *
   * @return HttpStatus.OK if json list wards in one district of Việt Nam
   */
  getAllWards(idDistrict: number): void {
    this.wardsListService.getAllWards(idDistrict).subscribe(data => {
      this.wardsList = data;
    }, error => {
      console.log('Lỗi truy xuất', error);
    }, () => {
    });
  }

}
