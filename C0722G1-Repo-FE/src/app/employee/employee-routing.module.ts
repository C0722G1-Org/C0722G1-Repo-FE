import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {EmployeeListComponent} from './employee-list/employee-list.component';
import {AuthGuard} from '../security/auth-guard';
import {EmployeeCreateComponent} from './employee-create/employee-create.component';
import {EmployeeEditComponent} from './employee-edit/employee-edit.component';

const routes: Routes = [
  {
    path: '', component: EmployeeListComponent, data: {title: 'employee'}
    // , canActivate: [AuthGuard],
    // data: {
    //   roles: ['ROLE_ADMIN']
    // }
  },
  {
    path: 'create', component: EmployeeCreateComponent
    // , canActivate: [AuthGuard],
    // data: {
    //   roles: ['ROLE_ADMIN']
    // }
  },
  {
    path: 'edit/:id', component: EmployeeEditComponent
    // , canActivate: [AuthGuard],
    // data: {
    //   roles: ['ROLE_ADMIN']
    // }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class EmployeeRoutingModule {
}
