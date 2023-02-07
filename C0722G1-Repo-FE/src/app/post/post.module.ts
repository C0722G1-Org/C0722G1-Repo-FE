import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {PostRoutingModule} from './post-routing.module';
import {PostCreateComponent} from './post-create/post-create.component';
import {PostEditComponent} from './post-edit/post-edit.component';
import {PostListComponent} from './post-list/post-list.component';
import {PostDeleteComponent} from './post-delete/post-delete.component';
import {PostDetailComponent} from './post-detail/post-detail.component';
import {PostChartComponent} from './post-chart/post-chart.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {PostApprovalComponent} from './post-approval/post-approval.component';
import {PostListApprovalComponent} from './post-list-approval/post-list-approval.component';
import {ToastContainerModule} from 'ngx-toastr';
import {PostListCustomerComponent} from './post-list-customer/post-list-customer.component';
import {AppModule} from '../app.module';
import {NgxPaginationModule} from 'ngx-pagination';
import {TruncateAddressModule} from './post-list-approval/truncate-address/truncate-address.module';


@NgModule({
  declarations: [PostCreateComponent, PostEditComponent, PostListComponent, PostDeleteComponent, PostDetailComponent, PostChartComponent,
    PostApprovalComponent, PostListApprovalComponent, PostListCustomerComponent, TruncateAddressModule],
  exports: [
    PostDeleteComponent,
    PostApprovalComponent,
    TruncateAddressModule
  ]
  ,
  imports: [
    CommonModule,
    PostRoutingModule,
    ToastContainerModule,
    FormsModule,
    ReactiveFormsModule,
    NgxPaginationModule
  ]

})
export class PostModule {
}
