import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {CustomerEditComponent} from './customer-edit/customer-edit.component';
import {CustomerCreateComponent} from './customer-create/customer-create.component';
import {AuthGuard} from "../security/auth-guard";

const routes: Routes = [
  {
    path: '', component: CustomerEditComponent
    , canActivate: [AuthGuard],
    data: {
      roles: ['ADMIN' && 'EMPLOYEE' && 'CUSTOMER']
    }
  },
  {
    path: 'create', component: CustomerCreateComponent
    , canActivate: [AuthGuard],
    data: {
      roles: ['ADMIN' && 'EMPLOYEE' && 'CUSTOMER']
    }
  },
  {
    path: 'edit/:id', component: CustomerEditComponent
    ,  canActivate: [AuthGuard],
  data: {
  roles: ['ADMIN' && 'EMPLOYEE' && 'CUSTOMER']
}
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CustomerRoutingModule {
}
