import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {NotificationServiceService} from '../../service/notification-service.service';
import {ActivatedRoute, Router} from '@angular/router';
import {Title} from '@angular/platform-browser';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-notification-update',
  templateUrl: './notification-update.component.html',
  styleUrls: ['./notification-update.component.css']
})
export class NotificationUpdateComponent implements OnInit {

  // @ts-ignore
  notification: Notification;
  notificationForm: FormGroup = new FormGroup({});
  id: any ;
  // @ts-ignore
  checkId: boolean;

  constructor(private notificationServiceService: NotificationServiceService,
              private activatedRoute: ActivatedRoute,
              private router: Router,
              private formBuilder: FormBuilder,
              private titleService: Title) {
    this.titleService.setTitle('update Notificaon');
  }

  ngOnInit(): void {
    this.updateNotification();

  }

  private updateNotification(): any {
    this.id = Number(this.activatedRoute.snapshot.params.id);
    return this.notificationServiceService.finNotificationdById(this.id).subscribe(data => {
      if (this.id != null) {
        this.checkId = true;
        // @ts-ignore
        this.notification = data;
        console.log('test', data);
        this.notificationForm = this.formBuilder.group({
          id: [],
          title: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(70), Validators.pattern(('^[a-zA-Z_ÀÁÂÃÈÉÊẾÌÍÒÓÔÕÙÚĂĐĨŨƠàáâãèéêếìíòóôõùúăđĩũơƯĂẠẢẤẦẨẪẬẮẰẲẴẶẸẺẼỀỀỂưăạảấầẩẫậắằẳẵặẹẻẽềềểỄỆỈỊỌỎỐỒỔỖỘỚỜỞỠỢỤỦỨỪễệỉịọỏốồổỗộớờởỡợụủứừỬỮỰỲỴÝỶỸửữựỳỵỷỹ0-9/ ]{2,30}$'))]],
          postingDate: ['', [Validators.required]],
          content: ['', [Validators.required, Validators.maxLength(350), Validators.minLength(3), Validators.pattern(('^[a-zA-Z_ÀÁÂÃÈÉÊẾÌÍÒÓÔÕÙÚĂĐĨŨƠàáâãèéêếìíòóôõùúăđĩũơƯĂẠẢẤẦẨẪẬẮẰẲẴẶẸẺẼỀỀỂưăạảấầẩẫậắằẳẵặẹẻẽềềểỄỆỈỊỌỎỐỒỔỖỘỚỜỞỠỢỤỦỨỪễệỉịọỏốồổỗộớờởỡợụủứừỬỮỰỲỴÝỶỸửữựỳỵỷỹ ]{2,30}$'))]]
        });
        this.notificationForm.patchValue(data);
      } else {
        this.checkId = false;
        alert('Notification Khong ton tai');
      }
    });

  }

  submit(id: number): void {
    const notification = this.notificationForm.value;
    console.log('notification', notification);
    this.notificationServiceService.update(id, notification).subscribe(() => {
      Swal.fire({
        icon: 'success',
        title: 'Chỉnh sửa  thành công!',
        width: 600,
        padding: '3em',
        color: '#716add',
        showConfirmButton: false,
        timer: 2500

      });

    });
    // this.router.navigateByUrl('');
    // this.ngOnInit();
  }

  // @ts-ignore
  comparWithId(item1, item2): boolean {
    return item1 && item2 && item1.id === item2.id;
  }

  resetForm(): void {
    this.ngOnInit();
  }

}
