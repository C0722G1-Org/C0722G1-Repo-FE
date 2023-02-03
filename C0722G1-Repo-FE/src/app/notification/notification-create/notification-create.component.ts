import { Component, OnInit } from '@angular/core';
import {FormGroup} from '@angular/forms';
import {NotificationServiceService} from '../../service/notification-service.service';
import {ActivatedRoute, Router} from '@angular/router';
import {Notification} from '../../entity/notification/notification';

@Component({
  selector: 'app-notification-create',
  templateUrl: './notification-create.component.html',
  styleUrls: ['./notification-create.component.css']
})
export class NotificationCreateComponent implements OnInit {

  notificationForm: FormGroup = new FormGroup({});
  notification: Notification | null = {};

  constructor(private contificationService: NotificationServiceService,
              private activatedRoute: ActivatedRoute,
              private router: Router) { }

  ngOnInit(): void {
    this.getCreateNotification();
  }

  getCreateNotification() {

  }
}
