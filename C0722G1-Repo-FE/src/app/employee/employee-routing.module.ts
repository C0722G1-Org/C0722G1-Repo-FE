import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {EmployeeListComponent} from './employee-list/employee-list.component';
import {EmployeeCreateComponent} from './employee-create/employee-create.component';
import {EmployeeEditComponent} from './employee-edit/employee-edit.component';

const routes: Routes = [
  {
    path: '', component: EmployeeListComponent
    , canActivate: [AuthGuard],
    data: {
      roles: ['ADMIN' && 'EMPLOYEE']
    }
  },
  {
    path: 'create', component: EmployeeCreateComponent
    , canActivate: [AuthGuard],
    data: {
      roles: ['ADMIN' && 'EMPLOYEE']
    }
  },
  {
    path: 'edit/:id', component: EmployeeEditComponent
    , canActivate: [AuthGuard],
    data: {
      roles: ['ADMIN' && 'EMPLOYEE']
    }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class EmployeeRoutingModule {
}
