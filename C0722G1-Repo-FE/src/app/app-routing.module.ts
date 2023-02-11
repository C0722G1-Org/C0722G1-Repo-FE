import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {AuthGuard} from './authGuard/auth.guard';
import {AdminGuard} from './authGuard/admin.guard';
import {CustomerGuard} from './authGuard/customer.guard';
import {AdminEmployeeGuard} from "./authGuard/admin-employee.guard";

const routes: Routes = [
  {path: 'home', loadChildren: () => import('./home/home.module').then(module => module.HomeModule)},
  {path: '', redirectTo: 'home', pathMatch: 'full'},
  {
    path: 'employee', loadChildren: () => import('./employee/employee.module').then(module => module.EmployeeModule),
    canActivate: [AuthGuard]
  },
  {
    path: 'post', loadChildren: () => import('./post/post.module').then(module => module.PostModule),
  },
  {
    path: 'customer', loadChildren: () => import('./customer/customer.module').then(module => module.CustomerModule)
  },
  {
    path: 'form', loadChildren: () => import('./form/form.module').then(module => module.FormModule),
    canActivate: [AuthGuard]
  },
  {
    path: 'notification',
    loadChildren: () => import('./notification/notification.module').then(module => module.NotificationModule),
    canActivate: [AuthGuard]
      && [AdminEmployeeGuard]
  },
  {
    path: 'security', loadChildren: () => import('./security/security.module').then(module => module.SecurityModule),
  },
  {path: '**', loadChildren: () => import('./not-found/not-found.module').then(module => module.NotFoundModule)}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
