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
import {AuthGuard} from '../authGuard/auth.guard';
import {AdminGuard} from '../authGuard/admin.guard';
import {CustomerGuard} from '../authGuard/customer.guard';
import {AdminEmployeeGuard} from "../authGuard/admin-employee.guard";

const routes: Routes = [
  {
    path: '', component: PostListApprovalComponent, canActivate: [AuthGuard] && [AdminEmployeeGuard]
  },
  {
    path: 'create', component: PostCreateComponent, canActivate: [AuthGuard] && [CustomerGuard]
  },
  {
    path: 'edit', component: PostEditComponent, canActivate: [AuthGuard]
  },
  {
    path: 'charts', component: PostChartComponent, canActivate: [AuthGuard]
  },
  {
    path: 'detail/:id', component: PostDetailComponent
  },
  {
    path: 'list/:search', component: PostListComponent
  },
  {
    path: 'list/customerByAdmin/:idCustomer', component: PostListCustomerComponent, canActivate: [AuthGuard]
  },
  {
    path: 'list/customerByCustomer/:idAccount', component: PostListCustomerComponent, canActivate: [AuthGuard]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PostRoutingModule {
}
