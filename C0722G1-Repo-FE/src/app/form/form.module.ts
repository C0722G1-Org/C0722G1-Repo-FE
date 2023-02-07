import {NgModule} from '@angular/core';
import { FormRoutingModule } from './form-routing.module';
import { FormCreateComponent } from './form-create/form-create.component';
import { FormEditComponent } from './form-edit/form-edit.component';
import { FormDeleteComponent } from './form-delete/form-delete.component';
import {FormListComponent} from './form-list/form-list.component';
import {CommonModule} from '@angular/common';
import {ReactiveFormsModule} from '@angular/forms';



@NgModule({
  declarations: [FormCreateComponent, FormListComponent, FormEditComponent, FormDeleteComponent],
    imports: [
        CommonModule,
        FormRoutingModule,
        ReactiveFormsModule
    ]
})
export class FormModule { }
