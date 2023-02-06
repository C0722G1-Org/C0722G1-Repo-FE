import {Component, OnInit} from '@angular/core';
import {Notification} from '../../entity/notification/notification';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {NotificationServiceService} from '../../service/notification-service.service';
import {ActivatedRoute, Router} from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-notification-update',
  templateUrl: './notification-update.component.html',
  styleUrls: ['./notification-update.component.css']
})
export class NotificationUpdateComponent implements OnInit {
  notification: Notification | null = {};
  notificationForm: FormGroup = new FormGroup({});
  id: number = 0;

  constructor(private contificationService: NotificationServiceService,
              private activatedRoute: ActivatedRoute,
              private router: Router) {}

  ngOnInit(): void {
    this.getNotification();
  }

  private getNotification() {
    this.id = Number(this.activatedRoute.snapshot.params.id);
    return this.contificationService.finNotificationdById(this.id).subscribe(data => {
      this.notification = data;
      this.notificationForm = new FormGroup({
        id: new FormControl(this.notification.idNotification,Validators.required,),
        title: new FormControl(this.notification. title,Validators.required),
        postingDate: new FormControl(this.notification.postingDate,Validators.required),
        conten: new FormControl(this.notification. conten,Validators.required)
      });
    });
  }

  submit(id: number) {
    const veXe = this.notificationForm.value;
    this.contificationService.update(id, veXe).subscribe(() => {
      Swal.fire({
        icon: 'success',
        title: 'Chỉnh sửa  thành công!',
        width: 600,
        padding: '3em',
        color: '#716add'
      });

    });
    this.router.navigateByUrl('');
    this.ngOnInit();
  }

  // @ts-ignore
  comparWithId(item1, item2): boolean {
    return item1 && item2 && item1.id === item2.id;
  }
}
