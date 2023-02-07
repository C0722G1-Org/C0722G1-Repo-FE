import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {PostComponentComponent} from './post-component/post-component.component';
import {PostCreateComponent} from './post-create/post-create.component';
import {PostEditComponent} from './post-edit/post-edit.component';
import {PostChartComponent} from './post-chart/post-chart.component';
import {PostListApprovalComponent} from './post-list-approval/post-list-approval.component';
import {PostDetailComponent} from './post-detail/post-detail.component';
import {PostListComponent} from './post-list/post-list.component';
import {PostListCustomerComponent} from './post-list-customer/post-list-customer.component';

const routes: Routes = [
  {
    path: '', component: PostListApprovalComponent
  },
  {
    path: 'create', component: PostCreateComponent
  },
  {
    path: 'edit', component: PostEditComponent
  },
  {
    path: 'charts', component: PostChartComponent
  },
  {
    path: 'detail/:id', component: PostDetailComponent
  },
  {
    path: 'list/customerByAdmin/:idCustomer', component: PostListCustomerComponent
  },
  {
    path: 'list/customerByCustomer/:idAccount', component: PostListCustomerComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PostRoutingModule {
}
