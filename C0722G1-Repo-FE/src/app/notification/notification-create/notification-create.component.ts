import {NotificationServiceService} from '../../service/notification-service.service';
import Swal from 'sweetalert2';
import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {ActivatedRoute, Router} from '@angular/router';
import {ToastrService} from 'ngx-toastr';
import {Title} from '@angular/platform-browser';

@Component({
  selector: 'app-notification-create',
  templateUrl: './notification-create.component.html',
  styleUrls: ['./notification-create.component.css']
})
export class NotificationCreateComponent implements OnInit {

  // @ts-ignore
  notificationForm: FormGroup;
  // @ts-ignore
  notification: Notification;

  constructor(private notificationService: NotificationServiceService,
              private activatedRoute: ActivatedRoute,
              private toast: ToastrService,
              private route: Router,
              private formBuilder: FormBuilder,
              private titleService: Title) {
    this.titleService.setTitle('create Notificaon');
  }

  ngOnInit(): void {
    this.getCreateNotification();
  }

  getCreateNotification(): void {
    this.notificationForm = this.formBuilder.group({
      id: [],
      title: ['', [Validators.required, Validators.maxLength(100), Validators.minLength(3), Validators.pattern(('^[a-zA-Z_ÀÁÂÃÈÉÊẾÌÍÒÓÔÕÙÚĂĐĨŨƠàáâãèéêếìíòóôõùúăđĩũơƯĂẠẢẤẦẨẪẬẮẰẲẴẶẸẺẼỀỀỂưăạảấầẩẫậắằẳẵặẹẻẽềềểỄỆỈỊỌỎỐỒỔỖỘỚỜỞỠỢỤỦỨỪễệỉịọỏốồổỗộớờởỡợụủứừỬỮỰỲỴÝỶỸửữựỳỵỷỹ ]{2,30}$'))]],
      postingDate: ['', [Validators.required]],
      content: ['', [Validators.required, Validators.maxLength(500), Validators.minLength(3), Validators.pattern(('^[a-zA-Z_ÀÁÂÃÈÉÊẾÌÍÒÓÔÕÙÚĂĐĨŨƠàáâãèéêếìíòóôõùúăđĩũơƯĂẠẢẤẦẨẪẬẮẰẲẴẶẸẺẼỀỀỂưăạảấầẩẫậắằẳẵặẹẻẽềềểỄỆỈỊỌỎỐỒỔỖỘỚỜỞỠỢỤỦỨỪễệỉịọỏốồổỗộớờởỡợụủứừỬỮỰỲỴÝỶỸửữựỳỵỷỹ ]{2,30}$'))]]
    });

  }

  submit(): void {
    const notification = this.notificationForm.value;
    this.notificationService.create(notification).subscribe(() => {
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
    this.route.navigateByUrl('');
    this.ngOnInit();
  }

  // @ts-ignore
  comparWithId(item1, item2): boolean {
    return item1 && item2 && item1.id === item2.id;
  }

  resetForm(): void {
    this.ngOnInit();
  }
}
