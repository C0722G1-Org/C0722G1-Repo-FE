import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FormRoutingModule } from './form-routing.module';
import { FormCreateComponent } from './form-create/form-create.component';
import { FormListComponent } from './form-list/form-list.component';
import { FormEditComponent } from './form-edit/form-edit.component';
import { FormDeleteComponent } from './form-delete/form-delete.component';


@NgModule({
  declarations: [FormCreateComponent, FormListComponent, FormEditComponent, FormDeleteComponent],
  imports: [
    CommonModule,
    FormRoutingModule
  ]
})
export class FormModule { }
