import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {CustomerEditComponent} from './customer-edit/customer-edit.component';
import {CustomerCreateComponent} from './customer-create/customer-create.component';
import {CustomerDetailComponent} from './customer-detail/customer-detail.component';
import {CustomerAddComponent} from './customer-add/customer-add.component';

const routes: Routes = [
  {
    path: '', component: CustomerEditComponent
  },
  {
    path: 'create', component: CustomerCreateComponent
  },
  {
    path: 'detail/:idCustomer', component: CustomerDetailComponent
  },
  {
    path: 'add', component: CustomerAddComponent
  },
  {
    path: 'edit', component: CustomerEditComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CustomerRoutingModule {
}
