import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {FormListComponent} from './form-list/form-list.component';
import {FormCreateComponent} from './form-create/form-create.component';
import {FormEditComponent} from './form-edit/form-edit.component';

const routes: Routes = [
  {path: '', component: FormListComponent},
  {path: 'create', component: FormCreateComponent},
  {path: 'edit/:id', component: FormEditComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class FormRoutingModule {
}
