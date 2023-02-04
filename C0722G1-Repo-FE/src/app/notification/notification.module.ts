import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { NotificationRoutingModule } from './notification-routing.module';
import { NotificationListComponent } from './notification-list/notification-list.component';
import { NotificationPipePipe } from './notification-list/notification-pipe.pipe';
import {ReactiveFormsModule} from '@angular/forms';


@NgModule({
  declarations: [NotificationListComponent, NotificationPipePipe],
    imports: [
        CommonModule,
        NotificationRoutingModule,
        ReactiveFormsModule
    ]
})
export class NotificationModule { }
