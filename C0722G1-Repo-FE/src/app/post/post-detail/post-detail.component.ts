import {Component, OnInit, ViewChild} from '@angular/core';
import {PostService} from '../post.service';
import {ActivatedRoute, Router} from '@angular/router';
import {ToastContainerDirective, ToastrService} from 'ngx-toastr';
// import {StatusPost} from '../../entity/post/status-post';
import {TokenService} from '../../service/token.service';
import {Image} from '../../entity/post/image';
import {PostDetailDto} from '../../dto/post/PostDetailDto';

@Component({
  selector: 'app-post-detail',
  templateUrl: './post-detail.component.html',
  styleUrls: ['./post-detail.component.css']
})
export class PostDetailComponent implements OnInit {
  // @ts-ignore
  @ViewChild(ToastContainerDirective, {static: true}) toastContainer: ToastContainerDirective;
  imageList: Image[] = [
    // {
    //   idImage: 1,
    //   url: 'https://file4.batdongsan.com.vn/resize/1275x717/2023/02/02/20230202154431-b87f_wm.jpg'
    // },
    // {idImage: 2, url: 'https://file4.batdongsan.com.vn/resize/1275x717/2023/02/02/20230202154431-fb0b_wm.jpg'},
    // {idImage: 3, url: 'https://file4.batdongsan.com.vn/resize/1275x717/2023/02/02/20230202154432-aded_wm.jpg'}
  ];
  // @ts-ignore
  accountId: string | null = '';
  million = 1000000;
  billion = 1000000000;
  postDetail: PostDetailDto = {};
  // Information
  idPost = 0;
  displayPrice = '';
  phoneNumber: string | undefined = '';
  // @ts-ignore
  displayPhoneNumber: string | undefined = '';

  constructor(private postService: PostService,
              private activatedRoute: ActivatedRoute,
              private toastr: ToastrService,
              private tokenService: TokenService,
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
          // if (HttpErrorResponse. === 502) {
          //   this.router.navigateByUrl('/post/error');
          // }
          console.log(dataPost.approval);
          if (dataPost.approval === false || dataPost.flagDeleted === true) {
            this.router.navigateByUrl('/error');
          }
          this.postDetail = dataPost;
          this.phoneNumber = dataPost.phoneCustomer1.slice(0, 6) + '*** • Hiện thêm';
          this.displayPhoneNumber = dataPost.phoneCustomer1;
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
    this.toastr.overlayContainer = this.toastContainer;
    if (this.tokenService.getToken()) {
      this.accountId = this.tokenService.getIdAccount();
    }
    console.log(this.postDetail);
  }

  /**
   * In order to show full Customer's PhoneNumber
   * Created by HuyDN
   * Created Date: 03/02/2023
   */
  showPhoneNumber(): void {
    this.phoneNumber = this.displayPhoneNumber;
  }

  /**
   * In order to copy a Post's link
   * Created by HuyDN
   * Created Date: 03/02/2023
   */
  showSucceedCopyLink(): void {
    navigator.clipboard.writeText('http://localhost:4200/post/detail/' + this.idPost);
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
    this.displayPrice = (this.postDetail.price / this.million) + 'Triệu';
    console.log(this.displayPrice);
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
}
