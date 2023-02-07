import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PostRoutingModule } from './post-routing.module';
import { PostCreateComponent } from './post-create/post-create.component';
import { PostEditComponent } from './post-edit/post-edit.component';
import { PostListComponent } from './post-list/post-list.component';
import { PostDeleteComponent } from './post-delete/post-delete.component';
import { PostDetailComponent } from './post-detail/post-detail.component';
import { PostChartComponent } from './post-chart/post-chart.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { PostApprovalComponent } from './post-approval/post-approval.component';
import { PostListApprovalComponent } from './post-list-approval/post-list-approval.component';
import { PostListCustomerComponent } from './post-list-customer/post-list-customer.component';


@NgModule({
  declarations: [PostCreateComponent, PostEditComponent, PostListComponent, PostDeleteComponent, PostDetailComponent, PostChartComponent,
    PostApprovalComponent, PostListApprovalComponent, PostListCustomerComponent],
  exports: [
    PostDeleteComponent,
    PostApprovalComponent
  ]
  ,
    imports: [
        CommonModule,
        PostRoutingModule,
        FormsModule,
        ReactiveFormsModule
    ]
})
export class PostModule { }
