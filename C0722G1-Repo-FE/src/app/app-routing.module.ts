import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';

const routes: Routes = [
  {path: 'home', loadChildren: () => import('./home/home.module').then(module => module.HomeModule)},
  {path: '', redirectTo: 'home', pathMatch: 'full'},
  {path: 'employee', loadChildren: () => import('./employee/employee.module').then(module => module.EmployeeModule)},
  {path: 'post', loadChildren: () => import('./post/post.module').then(module => module.PostModule)},
  {path: 'customer', loadChildren: () => import('./customer/customer.module').then(module => module.CustomerModule)},
  {path: 'form', loadChildren: () => import('./form/form.module').then(module => module.FormModule)},
  {path: 'notification' , loadChildren: () => import('./notification/notification.module').then(module => module.NotificationModule)}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
