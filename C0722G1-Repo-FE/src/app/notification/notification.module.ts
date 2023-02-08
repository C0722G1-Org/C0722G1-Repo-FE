import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { NotificationRoutingModule } from './notification-routing.module';
import { NotificationListComponent } from './notification-list/notification-list.component';
import { NotificationHomeComponent } from './notification-home/notification-home.component';
import {ReactiveFormsModule} from '@angular/forms';


@NgModule({
  declarations: [NotificationListComponent, NotificationHomeComponent],
  imports: [
    CommonModule,
    NotificationRoutingModule,
    ReactiveFormsModule
  ]
})
export class NotificationModule { }
