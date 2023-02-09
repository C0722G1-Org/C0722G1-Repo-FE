import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {EmployeeRoutingModule} from './employee-routing.module';
import {EmployeeCreateComponent} from './employee-create/employee-create.component';
import {EmployeeEditComponent} from './employee-edit/employee-edit.component';
import {EmployeeDeleteComponent} from './employee-delete/employee-delete.component';
import {EmployeeListComponent} from './employee-list/employee-list.component';
import {EmployeeDetailComponent} from './employee-detail/employee-detail.component';
import {ReactiveFormsModule} from '@angular/forms';
import {HomeModule} from '../home/home.module';


@NgModule({
  declarations: [EmployeeCreateComponent, EmployeeEditComponent, EmployeeDeleteComponent, EmployeeListComponent, EmployeeDetailComponent],
  imports: [
    CommonModule,
    EmployeeRoutingModule,
    ReactiveFormsModule,
    HomeModule
  ]
})
export class EmployeeModule {
}
