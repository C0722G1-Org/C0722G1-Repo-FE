import {Component, OnInit, ViewChild} from '@angular/core';
import {PostDetail} from '../../entity/post/post-detail';
import {PostService} from '../post.service';
import {ActivatedRoute} from '@angular/router';
import {ToastContainerDirective, ToastrService} from 'ngx-toastr';
import {StatusPost} from '../../entity/post/status-post';
import {TokenService} from '../../service/token.service';
import {Image} from '../../entity/post/image';

@Component({
  selector: 'app-post-detail',
  templateUrl: './post-detail.component.html',
  styleUrls: ['./post-detail.component.css']
})
export class PostDetailComponent implements OnInit {
  // @ts-ignore
  @ViewChild(ToastContainerDirective, {static: true}) toastContainer: ToastContainerDirective;
  statusPost: StatusPost[] = [
    {idStatusPost: 1, nameStatusPost: 'Chờ giao dịch'},
    {idStatusPost: 2, nameStatusPost: 'Đã giao dịch'},
    {idStatusPost: 3, nameStatusPost: 'Giao dịch thất bại'}];
  postDetail: PostDetail = {
    idPost: 1, price: 56000000000, area: 500, note: 'alo',
    customer: {
      idCustomer: 1,
      nameCustomer: 'Đặng Nhật Huy',
      phoneCustomer1: '0799440683',
      genderCustomer: 3,
      emailCustomer: 'b77cwalk@gmail.com'
    },
    demandType: {idDemandType: 2, nameDemandType: 'Bán'}, landType: {idLandType: 1, nameLandType: 'Căn hộ'},
    statusPost: this.statusPost[0],
    direction: {idDirection: 1, nameDirection: 'Đông Bắc'},
    dateCreation: '2023/02/03',
  };
  // postDetail: PostDetail = {};

  // @ts-ignore
  phoneNumber: string | undefined = this.postDetail?.customer?.phoneCustomer1.slice(0, 6) + '*** · Hiện số';
  accountId = 1;
  price = this.postDetail.price;
  million = 1000000;
  billion = 1000000000;
  Slide = 'Slide ';
  imageList: Image[] = [];

  constructor(private postService: PostService,
              private activatedRoute: ActivatedRoute,
              private toastr: ToastrService,
              private tokenService: TokenService) {
    this.activatedRoute.paramMap.subscribe(data => {
      const id = data.get('id');
      if (id != null) {
        /**
         * Method uses:
         * Send a request to backend API to get a Post by parameter Id
         * Created by: HuyDN
         * Created date: 02/02/2023
         * @param id: a Post' id
         * @return a Observable that contain a Post object can be showed on Post detail screen
         */
        this.postService.findPostById(Number(id)).subscribe(dataPost => {
          this.postDetail = dataPost;
          /**
           * Method uses:
           * Send a request to backend API to get a ImageSet by parameter Id
           * Created by: HuyDN
           * Created date: 04/02/2023
           * @param id: a Post' id
           * @return a Observable that contain a ImageSet object can be showed on Post detail screen
           */
          this.postService.findImageByIdPost(Number(id)).subscribe(dataImage => {
            this.imageList = dataImage;
          });
        });
      }
    });
  }

  /**
   * In order to use toast's message
   * Edit by HuyDN
   * Created Date: 03/02/2023
   */
  ngOnInit(): void {
    this.toastr.overlayContainer = this.toastContainer;
    // if (this.tokenService.getToken()){
    //   this.accountId = this.tokenService.getIdAccount();
    // }
    if (this.postDetail.price != null) {
      this.convertToMillion();
    }
    this.convertToBillion();
  }

  /**
   * In order to show full Customer's PhoneNumber
   * Created by HuyDN
   * Created Date: 03/02/2023
   */
  showPhoneNumber(): void {
    this.phoneNumber = this.postDetail.customer?.phoneCustomer1;
  }

  /**
   * In order to copy a Post's link
   * Created by HuyDN
   * Created Date: 03/02/2023
   */
  showSucceedCopyLink(): void {
    navigator.clipboard.writeText('http://localhost:4200/post/detail/' + this.postDetail.idPost);
    this.toastr.info('Đã copy đường dẫn');
  }

  /**
   * In order to report a bad Post
   * Created by HuyDN
   * Created Date: 03/02/2023
   */
  showSucceedReport(): void {
    this.toastr.error('Đã báo xấu bài đăng');
  }

  /**
   * In order to change Post's status to Succeed
   * Created by HuyDN
   * Created Date: 03/02/2023
   */
  showSucceedConfirmation(): void {
    // @ts-ignore
    this.postService.succeedConfirm(this.postDetail.idPost);
    this.toastr.success('Xác nhận giao dịch', 'Thành công!');
  }

  /**
   * In order to change display of price from number to text
   * Use for million unit
   * Created by HuyDN
   * Created Date: 03/02/2023
   */

  convertToMillion(): void {
    // @ts-ignore
    if (this.postDetail.price >= this.million) {
      // @ts-ignore
      this.price = this.postDetail.price / this.million + ' Triệu';
    }
  }

  /**
   * In order to change display of price from number to text
   * Use for billion unit
   * Created by HuyDN
   * Created Date: 03/02/2023
   */
  convertToBillion(): void {
    // @ts-ignore
    if (this.postDetail.price >= this.billion) {
      // @ts-ignore
      this.price = this.postDetail.price / this.billion + ' Tỷ';
    }
  }
}
