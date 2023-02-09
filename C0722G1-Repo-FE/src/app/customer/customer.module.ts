import {CustomerRoutingModule} from './customer-routing.module';
import {CustomerCreateComponent} from './customer-create/customer-create.component';
import {CustomerEditComponent} from './customer-edit/customer-edit.component';
import {CustomerListComponent} from './customer-list/customer-list.component';
import {CustomerDeleteComponent} from './customer-delete/customer-delete.component';
import {CustomerDetailComponent} from './customer-detail/customer-detail.component';
import {CustomerApprovalComponent} from './customer-approval/customer-approval.component';
import {CustomerAddComponent} from './customer-add/customer-add.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {CommonModule} from '@angular/common';
import {NgModule} from '@angular/core';
import { CustomerPipe } from './customer-list/customer.pipe';


@NgModule({
  declarations: [CustomerCreateComponent, CustomerEditComponent, CustomerListComponent, CustomerDeleteComponent, CustomerDetailComponent,
    CustomerApprovalComponent,
    CustomerAddComponent,
    CustomerPipe],
  imports: [
    CommonModule,
    CustomerRoutingModule,
    ReactiveFormsModule,
    FormsModule
  ]
})
export class CustomerModule {
}
