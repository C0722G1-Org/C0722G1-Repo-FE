import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {PostComponentComponent} from './post-component/post-component.component';
import {PostCreateComponent} from './post-create/post-create.component';
import {PostEditComponent} from './post-edit/post-edit.component';
import {PostListCustomerComponent} from "./post-list-customer/post-list-customer.component";

const routes: Routes = [
  {
    path: '', component: PostComponentComponent
  },
  {
    path: 'create', component: PostCreateComponent
  },
  {
    path: 'edit', component: PostEditComponent
  },
  {
    path: 'list/customerByAdmin/:idCustomer', component: PostListCustomerComponent
  },
  {
    path: 'list/customerByCustomer', component: PostListCustomerComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PostRoutingModule {
}
