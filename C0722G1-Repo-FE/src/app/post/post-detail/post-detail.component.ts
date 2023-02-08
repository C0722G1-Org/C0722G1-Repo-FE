import {PostService} from '../post.service';
import {TokenService} from '../../service/token.service';
import {Image} from '../../entity/post/image';
import {PostDetailDto} from '../../dto/post/PostDetailDto';
import {Component, OnInit, ViewChild} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {ToastContainerDirective, ToastrService} from 'ngx-toastr';
import {Title} from '@angular/platform-browser';

@Component({
  selector: 'app-post-detail',
  templateUrl: './post-detail.component.html',
  styleUrls: ['./post-detail.component.css']
})
export class PostDetailComponent implements OnInit {
// @ts-ignore
  @ViewChild(ToastContainerDirective, {static: true}) toastContainer: ToastContainerDirective;
  imageList: Image[] = [];
// @ts-ignore
  accountId: string | null = '';
  idCheck = 0;
  million = 1000000;
  billion = 1000000000;
  postDetail: PostDetailDto = {};
// Information
  idPost = 0;
  displayPrice = '';
  phoneNumber: string | undefined = '';
// @ts-ignore
  displayPhoneNumber: string | undefined = '';
  url: string | undefined = 'https://upload.wikimedia.org/wikipedia/commons/b/b1/Loading_icon.gif?20151024034921';

  constructor(private postService: PostService,
              private activatedRoute: ActivatedRoute,
              private toastr: ToastrService,
              private tokenService: TokenService,
              private titleService: Title,
              private router: Router) {
    this.activatedRoute.paramMap.subscribe(data => {
      const id = data.get('id');
      if (id != null) {
        this.idPost = Number(id);
        /**
         * Method uses:
         * Send a request to backend API to get a Post by parameter Id
         * Created by: HuyDN
         * Created date: 02/02/2023
         * @param id: a Post' id
         * @return a Observable that contain a Post object can be showed on Post detail screen
         */

        this.postService.findPostById(Number(id)).subscribe(dataPost => {
          console.log(dataPost.approval);
          if (dataPost.approval === false || dataPost.flagDeleted === true) {
            this.router.navigateByUrl('/post/error');
          }
          this.postDetail = dataPost;
          this.phoneNumber = dataPost.phoneCustomer1.slice(0, 6) + '*** • Hiện thêm';
          this.displayPhoneNumber = dataPost.phoneCustomer1;
          this.postService.getAccountId(this.postDetail.idCustomer).subscribe(idAccount => {
            console.log(this.postDetail.idCustomer);
            this.idCheck = idAccount;
            console.log(this.accountId);
          });
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
            this.url = this.imageList[0].url;
            if (this.postDetail.price != null && this.postDetail.price >= this.billion) {
              this.convertToBillion();
            } else if (this.postDetail.price != null && this.postDetail.price >= this.million) {
              this.convertToMillion();
            }
          });
        });
      }
    }, error => {
    });
  }

  /**
   * In order to use toast's message
   * Edit by HuyDN
   * Created Date: 03/02/2023
   */
  ngOnInit(): void {
    this.titleService.setTitle('Chi tiết bất động sản');
    this.toastr.overlayContainer = this.toastContainer;
    if (this.tokenService.getToken()) {
      this.accountId = this.tokenService.getIdAccount();
    }
    this.toastr.toastrConfig.positionClass = 'toast-bottom-right';
  }

  /**
   * In order to show full Customer's PhoneNumber
   * Created by HuyDN
   * Created Date: 03/02/2023
   */
  showPhoneNumber(): void {
    this.phoneNumber = this.displayPhoneNumber + ' • Sao chép';
  }

  /**
   * In order to copy a Post's link
   * Created by HuyDN
   * Created Date: 03/02/2023
   */
  showSucceedCopyLink(): void {
    navigator.clipboard.writeText('http://localhost:4200/post/detail/' + this.idPost);
    this.toastr.info('Đã sao chép đường dẫn URL');
  }

  /**
   * In order to report a bad Post
   * Created by HuyDN
   * Created Date: 03/02/2023
   */

  /**
   * In order to change Post's status to Succeed
   * Created by HuyDN
   * Created Date: 03/02/2023
   */
  showSucceedConfirmation(): void {
    // @ts-ignore
    this.postService.succeedConfirm(this.idPost);
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
    this.displayPrice = (this.postDetail.price / this.million) + ' Triệu';
  }

  /**
   * In order to change display of price from number to text
   * Use for billion unit
   * Created by HuyDN
   * Created Date: 03/02/2023
   */
  convertToBillion(): void {
    // @ts-ignore
    this.displayPrice = (this.postDetail.price / this.billion) + ' Tỷ';
  }

  copyPhoneNumber(phoneNumber: string | undefined): void {
    if (this.displayPhoneNumber != null && phoneNumber === this.displayPhoneNumber + ' • Sao chép') {
      navigator.clipboard.writeText(this.displayPhoneNumber);
      this.toastr.info('Đã sao chép số điện thoại');
    }
  }

  changeImage(url: string | undefined): void {
    this.url = url;
  }
}
