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
import {Title} from "@angular/platform-browser";

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
  showMore = false;
  abc !: number;
  minPriceSearch: any = '';
  maxPriceSearch: any = '';
  minAreaSearch = '';
  maxAreaSearch = '';
  demandTypeSearch = '';
  landTypeSearch = '';
  citySearch = '';
  districtSearch = '';
  wardsSearch = '';

  constructor(private postListApprovalService: PostListApprovalService,
              private toastrService: ToastrService,
              private cityListService: CityListService,
              private districtListService: DistrictListService,
              private wardsListService: WardsListService,
              private title: Title
  ) {
    this.title.setTitle('Danh sách nhu cầu');
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
      wardsSearch: new FormControl(''),
      minAreaSearch: new FormControl('', [Validators.min(0)]),
      maxAreaSearch: new FormControl('', [Validators.min(0)]),
    },);
    this.getAllCity();
  }

  /**
   * Create by: NgocLV
   * Date created: 05/02/2023
   * Function: get page post
   *
   * @return return this page with all element
   */

  getPagePost(pageNumber: number): void {
    this.postListApprovalService.getAllPostApproval(pageNumber).subscribe(next => {
      this.postApprovalList = next;
    }, error => {
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
  getSearchPagePost(demandTypeSearch: any, landTypeSearch: any, minPriceSearch: any, maxPriceSearch: any, citySearch: any, districtSearch: any, wardsSearch: any, minAreaSearch: any, maxAreaSearch: any, pageNumber: any): void {
    // tslint:disable-next-line:max-line-length
    this.postListApprovalService.getPostApprovalsBySearch(demandTypeSearch, landTypeSearch, minPriceSearch, maxPriceSearch, citySearch, districtSearch, wardsSearch, minAreaSearch, maxAreaSearch, pageNumber).subscribe(data => {
      this.postApprovalList = data;
      if (this.postApprovalList != null) {
        this.toastrService.success('Tìm kiếm thành công.', 'Thông báo', {
          timeOut: 2000,
          progressBar: true,
          positionClass: 'toast-top-right',
          easing: 'ease-in'
        })
      } else {
        this.toastrService.error('Không tìm thấy dữ liệu.', 'Lỗi', {
          timeOut: 2000,
          progressBar: true,
          positionClass: 'toast-top-right',
          easing: 'ease-in'
        })
      }
      ;
    }, (error: any) => {
      this.toastrService.error('Lỗi kết nối.', 'Lỗi', {
        timeOut: 2000,
        progressBar: true,
        positionClass: 'toast-top-right',
        easing: 'ease-in'
      });
    }, () => {
    });
  }

  /**
   * Create by: NgocLV
   * Date created: 05/02/2023
   * Function: get search page post after delete
   *
   * @return return this page which all element which is math with value is selected when search
   */
// tslint:disable-next-line:max-line-length
  getSearchPagePostAfterAction(demandTypeSearch: any, landTypeSearch: any, minPriceSearch: any, maxPriceSearch: any, citySearch: any, districtSearch: any, wardsSearch: any, minAreaSearch: any, maxAreaSearch: any, pageNumber: any): void {
    // tslint:disable-next-line:max-line-length
    this.postListApprovalService.getPostApprovalsBySearch(demandTypeSearch, landTypeSearch, minPriceSearch, maxPriceSearch, citySearch, districtSearch, wardsSearch, minAreaSearch, maxAreaSearch, pageNumber).subscribe(data => {
      this.postApprovalList = data;
      ;
    })
  };

  /**
   * Create by: NgocLV
   * Date created: 08/02/2023
   * Function: transfer Value
   *
   * @return return the value which is match type to search
   */
  transferValue() {
    if (this.postApprovalSearch.value.minPriceSearch == null || this.postApprovalSearch.value.minPriceSearch === '') {
      this.minPriceSearch = '';
    } else {
      this.minPriceSearch = this.postApprovalSearch.value.minPriceSearch * 1000000;

    }
    if (this.postApprovalSearch.value.maxPriceSearch == null || this.postApprovalSearch.value.maxPriceSearch === '') {
      this.maxPriceSearch = '';
    } else {
      this.maxPriceSearch = this.postApprovalSearch.value.maxPriceSearch * 1000000;
    }
    this.postApprovalSearch.value.minAreaSearch == null ? this.minAreaSearch = '' : this.minAreaSearch = this.postApprovalSearch.value.minAreaSearch;
    this.postApprovalSearch.value.maxAreaSearch == null ? this.maxAreaSearch = '' : this.maxAreaSearch = this.postApprovalSearch.value.maxAreaSearch;
    this.demandTypeSearch = this.postApprovalSearch.value.demandTypeSearch;
    this.landTypeSearch = this.postApprovalSearch.value.landTypeSearch;
    this.citySearch = this.postApprovalSearch.value.citySearch;
    this.districtSearch = this.postApprovalSearch.value.districtSearch;
    this.wardsSearch = this.postApprovalSearch.value.wardsSearch;
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
    this.transferValue()
    if (this.postApprovalSearch.valid) {
      this.getSearchPagePost(this.demandTypeSearch,
        this.landTypeSearch,
        this.minPriceSearch,
        this.maxPriceSearch,
        this.citySearch,
        this.districtSearch,
        this.wardsSearch,
        this.minAreaSearch,
        this.maxAreaSearch, 0);
    } else if (!this.postApprovalSearch.controls.minPriceSearch.dirty && !this.postApprovalSearch.controls.maxPriceSearch.dirty || !this.postApprovalSearch.controls.minAreaSearch.dirty && !this.postApprovalSearch.controls.maxAreaSearch.dirty) {
      this.getSearchPagePost(this.postApprovalSearch.value.demandTypeSearch,
        this.postApprovalSearch.value.landTypeSearch,
        this.postApprovalSearch.value.minPriceSearch,
        this.postApprovalSearch.value.maxPriceSearch,
        this.postApprovalSearch.value.citySearch,
        this.postApprovalSearch.value.districtSearch,
        this.postApprovalSearch.value.wardsSearch,
        this.postApprovalSearch.value.minAreaSearch,
        this.postApprovalSearch.value.maxAreaSearch, 0);
    }
  }

  /**
   * Create by: NgocLV
   * Date created: 05/02/2023
   * Function: onsubmit after delete
   *
   * @return return this page which all element which is math with value is selected when search
   */
// tslint:disable-next-line:typedef
  onSubmitAfterAction() {
    this.transferValue()
    if (this.postApprovalSearch.valid) {
      this.getSearchPagePostAfterAction(this.demandTypeSearch,
        this.landTypeSearch,
        this.minPriceSearch,
        this.maxPriceSearch,
        this.citySearch,
        this.districtSearch,
        this.wardsSearch,
        this.minAreaSearch,
        this.maxAreaSearch, 0);
    } else if (!this.postApprovalSearch.controls.minPriceSearch.dirty && !this.postApprovalSearch.controls.maxPriceSearch.dirty || !this.postApprovalSearch.controls.minAreaSearch.dirty && !this.postApprovalSearch.controls.maxAreaSearch.dirty) {
      this.getSearchPagePostAfterAction(this.postApprovalSearch.value.demandTypeSearch,
        this.postApprovalSearch.value.landTypeSearch,
        this.postApprovalSearch.value.minPriceSearch,
        this.postApprovalSearch.value.maxPriceSearch,
        this.postApprovalSearch.value.citySearch,
        this.postApprovalSearch.value.districtSearch,
        this.postApprovalSearch.value.wardsSearch,
        this.postApprovalSearch.value.minAreaSearch,
        this.postApprovalSearch.value.maxAreaSearch, 0);
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
    if (this.postApprovalSearch.dirty) {
      if (this.postApprovalSearch.valid) {
        this.getSearchPagePostAfterAction(this.demandTypeSearch,
          this.landTypeSearch,
          this.minPriceSearch,
          this.maxPriceSearch,
          this.citySearch,
          this.districtSearch,
          this.wardsSearch,
          this.minAreaSearch,
          this.maxAreaSearch, pageNumber);
      } else if (!this.postApprovalSearch.controls.minPriceSearch.dirty && !this.postApprovalSearch.controls.maxPriceSearch.dirty || !this.postApprovalSearch.controls.minAreaSearch.dirty && !this.postApprovalSearch.controls.maxAreaSearch.dirty) {
        this.getSearchPagePostAfterAction(this.postApprovalSearch.value.demandTypeSearch,
          this.postApprovalSearch.value.landTypeSearch,
          this.postApprovalSearch.value.minPriceSearch,
          this.postApprovalSearch.value.maxPriceSearch,
          this.postApprovalSearch.value.citySearch,
          this.postApprovalSearch.value.districtSearch,
          this.postApprovalSearch.value.wardsSearch,
          this.postApprovalSearch.value.minAreaSearch,
          this.postApprovalSearch.value.maxAreaSearch, pageNumber);
      }
    } else {
      this.getPagePost(pageNumber);
    }
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
    }, error => {
    }, () => {
    });
  }

  /**
   * Create by: NgocLV
   * Date created: 05/02/2023
   * Function: get list wards
   *
   \  * @return HttpStatus.OK if json list wards in one district of Việt Nam
   */
  getAllWards(idDistrict: number): void {
    this.wardsListService.getAllWards(idDistrict).subscribe(data => {
      this.wardsList = data;
    }, error => {
    }, () => {
    });
  }

  /**
   * Create by: NgocLV
   * Date created: 07/02/2023
   * Function: expand or collapse value which is show in one td
   *
   */
// tslint:disable-next-line:typedef
  expandOrCollapsePosition(id: number, action: string) {
    if (action === 'expand') {
      // @ts-ignore
      document.getElementById('expandedContent' + id).style.display = 'inline-block';
      // @ts-ignore
      document.getElementById('collapsedContent' + id).style.display = 'none';
    } else {
      // @ts-ignore
      document.getElementById('expandedContent' + id).style.display = 'none';
      // @ts-ignore
      document.getElementById('collapsedContent' + id).style.display = 'inline-block';
    }
  }

  /**
   * Create by: NgocLV
   * Date created: 08/02/2023
   * Function: expand or collapse value which is show in one td
   *
   */


  expandOrCollapseNote(id: number, action: string) {
    if (action === 'expand') {
      // @ts-ignore
      document.getElementById('expandedContentNote' + id).style.display = 'inline-block';
      // @ts-ignore
      document.getElementById('collapsedContentNote' + id).style.display = 'none';
    } else {
      // @ts-ignore
      document.getElementById('expandedContentNote' + id).style.display = 'none';
      // @ts-ignore
      document.getElementById('collapsedContentNote' + id).style.display = 'inline-block';
    }
  }

  resetSearchValue() {
    this.ngOnInit();
  }
}
