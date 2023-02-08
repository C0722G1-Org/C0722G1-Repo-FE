import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {PostApproval} from '../../entity/post/post-approval';
import {PostListApprovalService} from '../post-list-approval/post-list-approval.service';
import {ToastrService} from 'ngx-toastr';

@Component({
  selector: 'app-post-delete',
  templateUrl: './post-delete.component.html',
  styleUrls: ['./post-delete.component.css']
})
export class PostDeleteComponent implements OnInit {
  @Input()
  postApproval: PostApproval = {};
  @Output()
  emiter = new EventEmitter();

  constructor(private postListApprovalService: PostListApprovalService,
              private toastrService: ToastrService) {
  }

  ngOnInit(): void {
  }

  deletePost(): any {

    this.postListApprovalService.deletePostById(this.postApproval.idPost).subscribe((data: any) => {
      this.emiter.emit('');
      this.toastrService.success('Xóa thành công', 'Thông báo', {
        timeOut: 2000,
        progressBar: true,
        positionClass: 'toast-top-right',
        easing: 'ease-in'
      });
    }, (error: any) => {
      this.toastrService.error('Nhu cầu đã bị xoá từ trước', 'Lỗi', {
        timeOut: 2000,
        progressBar: true,
        positionClass: 'toast-top-right',
        easing: 'ease-in'
      });
    }, () => {
    });
  }

}
