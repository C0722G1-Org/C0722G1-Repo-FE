import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {NotificationListComponent} from './notification-list/notification-list.component';
import {PostCreateComponent} from '../post/post-create/post-create.component';
import { NotificationHomeComponent } from './notification-home/notification-home.component';

const routes: Routes = [
  {path: '', component: NotificationListComponent},
  {
    path: 'home', component: NotificationHomeComponent
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class NotificationRoutingModule {
}
