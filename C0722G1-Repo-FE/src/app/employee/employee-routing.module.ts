import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {EmployeeListComponent} from './employee-list/employee-list.component';
import {EmployeeCreateComponent} from './employee-create/employee-create.component';
import {EmployeeEditComponent} from './employee-edit/employee-edit.component';
import {AuthGuard} from '../authGuard/auth.guard';
import {AdminGuard} from '../authGuard/admin.guard';
import {EmployeeGuard} from '../authGuard/employee.guard';

const routes: Routes = [
  {
    path: '', component: EmployeeListComponent,canActivate: [AdminGuard]
  },
  {
    path: 'create', component: EmployeeCreateComponent,canActivate: [AdminGuard]
  },
  {
    path: 'edit/:id', component: EmployeeEditComponent,canActivate: [AdminGuard]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class EmployeeRoutingModule {
}
