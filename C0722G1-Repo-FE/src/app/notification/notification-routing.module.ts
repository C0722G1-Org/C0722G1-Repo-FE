import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {NotificationListComponent} from './notification-list/notification-list.component';
import {NotificationCreateComponent} from './notification-create/notification-create.component';
import {NotificationUpdateComponent} from './notification-update/notification-update.component';

const routes: Routes = [
  {path: '', component: NotificationListComponent},
  {
    path: 'create', component: NotificationCreateComponent
  },
  {
    path: 'edit/:id', component: NotificationUpdateComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class NotificationRoutingModule {
}
