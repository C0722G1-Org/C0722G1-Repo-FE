import {NgModule} from '@angular/core';
import {NotificationRoutingModule} from './notification-routing.module';
import {NotificationListComponent} from './notification-list/notification-list.component';
import {NotificationPipePipe} from './notification-list/notification-pipe.pipe';
import {NotificationCreateComponent} from './notification-create/notification-create.component';
import {NotificationUpdateComponent} from './notification-update/notification-update.component';
import {CommonModule} from '@angular/common';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';

// @ts-ignore
@NgModule({
  declarations: [NotificationListComponent, NotificationPipePipe, NotificationCreateComponent, NotificationUpdateComponent],
  exports: [
    NotificationListComponent
  ],
    imports: [
        CommonModule,
        NotificationRoutingModule,
        ReactiveFormsModule,
        FormsModule
    ]
})
export class NotificationModule { }
