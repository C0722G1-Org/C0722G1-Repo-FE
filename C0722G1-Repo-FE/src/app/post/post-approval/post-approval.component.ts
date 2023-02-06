import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {PostApproval} from '../../entity/post/post-approval';
import {PostListApprovalService} from '../post-list-approval/post-list-approval.service';
import {ToastrService} from 'ngx-toastr';

@Component({
  selector: 'app-post-approval',
  templateUrl: './post-approval.component.html',
  styleUrls: ['./post-approval.component.css']
})
export class PostApprovalComponent implements OnInit {

  @Input()
  postApproval: PostApproval = {};
  @Output()
  emiter = new EventEmitter();

  constructor(private postListApprovalService: PostListApprovalService,
              private toastrService: ToastrService) {
  }

  ngOnInit(): void {
  }

  approvalPost(): void {
    this.postListApprovalService.approvalPostById(this.postApproval.idPost).subscribe((data: any) => {
        this.emiter.emit('');
        this.toastrService.success('Duyệt thành công', 'Thông báo', {
          timeOut: 2000,
          progressBar: true,
          positionClass: 'toast-top-right',
          easing: 'ease-in'
        });
      }
      , (error: any) => {
        this.toastrService.error('Nhu cầu đã bị xoá', 'Lỗi', {
          timeOut: 2000,
          progressBar: true,
          positionClass: 'toast-top-right',
          easing: 'ease-in'
        });
      }, () => {
      });
  }

}
