import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {CustomerEditComponent} from './customer-edit/customer-edit.component';
import {CustomerCreateComponent} from './customer-create/customer-create.component';
import {AuthGuard} from '../authGuard/auth.guard';
import {AdminGuard} from '../authGuard/admin.guard';
import {CustomerGuard} from '../authGuard/customer.guard';
import {EmployeeGuard} from '../authGuard/employee.guard';
import {CustomerListComponent} from './customer-list/customer-list.component';

import {CustomerListComponent} from "./customer-list/customer-list.component";
import {CustomerDetailComponent} from './customer-detail/customer-detail.component';
import {CustomerAddComponent} from './customer-add/customer-add.component';

const routes: Routes = [
  {
    path: '', component: CustomerListComponent
    // , canActivateChild: [AdminGuard]
  },
  {
    path: 'create', component: CustomerCreateComponent
    // , canActivate: [AuthGuard] && [CustomerGuard]
  },
  {
    path: 'detail/:idCustomer', component: CustomerDetailComponent
  },
  {
    path: 'add', component: CustomerAddComponent
  },
  {
    path: 'edit/:id', component: CustomerEditComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CustomerRoutingModule {
}
