import {Component, OnInit} from '@angular/core';
import {AbstractControl, FormBuilder, FormGroup, Validators} from '@angular/forms';
import {ActivatedRoute, Router} from '@angular/router';
import {Title} from '@angular/platform-browser';
import {ToastrService} from 'ngx-toastr';
import {NotificationService} from '../../service/notification.service';
import {Notification} from '../../entity/notification/notification';

// @ts-ignore
@Component({
  selector: 'app-notification-update',
  templateUrl: './notification-update.component.html',
  styleUrls: ['./notification-update.component.css']
})
export class NotificationUpdateComponent implements OnInit {
  notification!: Notification;
  notificationForm: FormGroup = new FormGroup({});
  id!: number;
  // @ts-ignore
  checkId: boolean;
  notificationHasContent!: boolean;
  constructor(private notificationService: NotificationService,
              private activatedRoute: ActivatedRoute,
              private router: Router,
              private formBuilder: FormBuilder,
              private titleService: Title,
              private toastrService: ToastrService) {
    this.titleService.setTitle('Chỉnh Sửa Thông Báo');
  }

  ngOnInit(): void {
    this.updateNotification();
  }

  // tslint:disable-next-line:typedef
  private updateNotification() {
    this.id = Number(this.activatedRoute.snapshot.params.id);
    if (this.id == null) {
      this.notificationHasContent = false;
      return;
    }
    return this.notificationService.findNotificationdById(this.id).subscribe(data => {
      if (data == null) {
        this.router.navigateByUrl("/**");
        return;
      }
      this.notificationHasContent = true;
      this.checkId = true;
      // @ts-ignore
      this.notification = data;
      this.notificationForm = this.formBuilder.group({
        id: [],
        title: [this.notification.title, [Validators.required, Validators.minLength(7), Validators.maxLength(45)]],
        postingDate: [this.notification.postingDate, [Validators.required, this.constrainNotAfterToday, this.constrainMinToday]],
        content: [this.notification.content, [Validators.required, Validators.maxLength(400), Validators.minLength(7)]]
      });
    }, err => {
      // @ts-ignore
      if (error.status === 400 || 404){
        this.router.navigateByUrl("/**")
      }
    });
  }

  constrainNotAfterToday(abstractControl: AbstractControl): any {
    if (abstractControl.value === '') {
      return null;
    }
    const today = new Date().getTime();
    const inputSearchDate = new Date(abstractControl.value).getTime();
    return (today - inputSearchDate >= 0) ? null : {invalidSearchDate: true};
  }

  constrainMinToday(abstractControl: AbstractControl): any {
    if (abstractControl.value === '') {
      return null;
    }
    const today = new Date().getTime();
    const inputSearchDate = new Date(abstractControl.value).getTime();
    return (today - inputSearchDate < 1000 * 60 * 60 * 24 * 365) ? null : {invalidMinDate: true};
  }

  getToday(): string {
    const today = new Date();
    return (new Date(today.getTime())).toJSON().substring(0, 10);
  }

  submit(id: number): void {
    const notification = this.notificationForm.value;
    this.notificationService.update(id, notification).subscribe(() => {
      this.toastrService.success('Sửa thành công.', 'Thông báo', {
        timeOut: 2000,
        progressBar: true,
        positionClass: 'toast-top-right',
        easing: 'ease-in'
      });
    }, err => {
      this.toastrService.error('Đã xảy ra lỗi.', 'Lỗi', {
        timeOut: 2000,
        progressBar: true,
        positionClass: 'toast-top-right',
        easing: 'ease-in'
      });
    }, () => {
      this.redirectTo('notification');
    });
    this.ngOnInit();
  }

  resetForm(): void {
    this.ngOnInit();
  }

  redirectTo(uri: string): void {
    this.router.navigateByUrl('/', {skipLocationChange: true}).then(() =>
      this.router.navigate([uri]));
  }
}
