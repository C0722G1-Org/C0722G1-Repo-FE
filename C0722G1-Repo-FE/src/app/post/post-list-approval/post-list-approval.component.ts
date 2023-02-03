import {Component, OnInit} from '@angular/core';
import {PostApproval} from '../../entity/post/post-approval';
import {PostListApprovalService} from './post-list-approval.service';
import {PagePostDto} from '../../entity/post/page-post-dto';
import {ToastrService} from 'ngx-toastr';

@Component({
  selector: 'app-post-list-approval',
  templateUrl: './post-list-approval.component.html',
  styleUrls: ['./post-list-approval.component.css']
})
export class PostListApprovalComponent implements OnInit {
  // searchNotification(pageNumber: number): void {
  //   this.notificationService.getPageNotifications(this.rfSearch.value, pageNumber).subscribe(next => {
  //     this.pageNotifications = next;
  //   }, error => {
  //     console.log('Lỗi truy xuất dữ liệu.');
  //   });
  // }

  postApprovalList!: PagePostDto;
  temp: PostApproval = {};

  constructor(private postListApprovalService: PostListApprovalService,
              private toastrService: ToastrService) {
  }
  //ngOnInit(): void {
  //   this.createSearchForm();
  //   this.searchNotification(0);
  //   this.deleteIds = [];
  //   this.checkedAll = false;
  //   console.log('test date: ' + this.testDate);
  // }
  ngOnInit(): void {
    this.getPagePost(0);
  }

  getPagePost(pageNumber: number): void {
    this.postListApprovalService.getAllPostApproval(pageNumber).subscribe(next => {
      this.postApprovalList = next;
    }, error => {
      console.log('Lỗi truy xuất');
    });
  }

  gotoPage(pageNumber: number): void {
    this.getPagePost(pageNumber);
  }
  // tslint:disable-next-line:typedef
  reload() {
    this.getPagePost(0);

  }


}
