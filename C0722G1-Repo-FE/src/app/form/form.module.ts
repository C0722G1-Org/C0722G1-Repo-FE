import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FormRoutingModule } from './form-routing.module';
import { FormCreateComponent } from './form-create/form-create.component';
import { FormListComponent } from './form-list/form-list.component';
import { FormEditComponent } from './form-edit/form-edit.component';
import { FormDeleteComponent } from './form-delete/form-delete.component';
import {ReactiveFormsModule} from '@angular/forms';
import {CKEditorModule} from '@ckeditor/ckeditor5-angular';



@NgModule({
  declarations: [FormCreateComponent, FormListComponent, FormEditComponent, FormDeleteComponent],
    imports: [
        CommonModule,
        FormRoutingModule,

        ReactiveFormsModule
    ]
})
export class FormModule { }
