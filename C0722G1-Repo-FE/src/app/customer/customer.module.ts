import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CustomerRoutingModule } from './customer-routing.module';
import { CustomerCreateComponent } from './customer-create/customer-create.component';
import { CustomerEditComponent } from './customer-edit/customer-edit.component';
import { CustomerListComponent } from './customer-list/customer-list.component';
import { CustomerDeleteComponent } from './customer-delete/customer-delete.component';
import { CustomerDetailComponent } from './customer-detail/customer-detail.component';
import {ReactiveFormsModule} from '@angular/forms';


@NgModule({
  declarations: [CustomerCreateComponent, CustomerEditComponent, CustomerListComponent, CustomerDeleteComponent, CustomerDetailComponent],
    imports: [
        CommonModule,
        CustomerRoutingModule,
        ReactiveFormsModule
    ]
})
export class CustomerModule { }
