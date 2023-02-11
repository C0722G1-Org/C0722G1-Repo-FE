import {NotificationServiceService} from '../../service/notification-service.service';
import Swal from 'sweetalert2';
import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {ActivatedRoute, Router} from '@angular/router';
import {ToastrService} from 'ngx-toastr';
import {Title} from '@angular/platform-browser';
import {NotificationService} from '../../service/notification.service';

// @ts-ignore
@Component({
  selector: 'app-notification-create',
  templateUrl: './notification-create.component.html',
  styleUrls: ['./notification-create.component.css']
})
export class NotificationCreateComponent implements OnInit {

  notificationForm!: FormGroup;

  notification!: Notification;

  constructor(private notificationService: NotificationService,
              private activatedRoute: ActivatedRoute,
              private toast: ToastrService,
              private router: Router,
              private formBuilder: FormBuilder,
              private titleService: Title) {
    this.titleService.setTitle('Tạo Thông Báo Mới');
  }

  ngOnInit(): void {
    this.getCreateNotification();
  }

  getCreateNotification(): void {
    this.notificationForm = this.formBuilder.group({
      id: [],
      title: ['', [Validators.required, Validators.maxLength(45), Validators.minLength(5)]],
      postingDate: [this.getToday(), Validators.required],
      content: ['', [Validators.required, Validators.maxLength(400), Validators.minLength(7)]]
    });
  }

  submit(): void {
    const notification = this.notificationForm.value;
    // @ts-ignore
    // @ts-ignore
    this.notificationService.create(notification).subscribe(() => {
      this.toast.success('Thêm mới thành công.', 'Thông báo', {
        timeOut: 2000,
        progressBar: true,
        positionClass: 'toast-top-right',
        easing: 'ease-in'
      });
    }, (error: any) => {
      this.toast.error('Đã xảy ra lỗi khi thêm mới.', 'Lỗi', {
        timeOut: 2000,
        progressBar: true,
        positionClass: 'toast-top-right',
        easing: 'ease-in'
      });
    });
    // this.route.navigateByUrl('/notification');
    this.redirectTo('/notification');
    this.ngOnInit();
  }

  resetForm(): void {
    this.ngOnInit();
  }

  getToday(): string {
    const today = new Date();
    return (new Date(today.getTime())).toJSON().substring(0, 10);
  }

  redirectTo(uri: string): void {
    this.router.navigateByUrl('/', {skipLocationChange: true}).then(() =>
      this.router.navigate([uri]));
  }
}
