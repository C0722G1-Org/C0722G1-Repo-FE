import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PostRoutingModule } from './post-routing.module';
import { PostCreateComponent } from './post-create/post-create.component';
import { PostEditComponent } from './post-edit/post-edit.component';
import { PostListComponent } from './post-list/post-list.component';
import { PostDeleteComponent } from './post-delete/post-delete.component';
import { PostDetailComponent } from './post-detail/post-detail.component';
import { PostChartComponent } from './post-chart/post-chart.component';
import {FormsModule} from '@angular/forms';
import { PostApprovalComponent } from './post-approval/post-approval.component';
import {FormsModule} from "@angular/forms";
import {NgxPaginationModule} from "ngx-pagination";

@NgModule({
  // tslint:disable-next-line:max-line-length
    declarations: [PostCreateComponent, PostEditComponent, PostListComponent, PostDeleteComponent, PostDetailComponent, PostChartComponent, PostApprovalComponent],
  exports: [
    PostDeleteComponent,
    PostApprovalComponent
  ],
    imports: [
        CommonModule,
        PostRoutingModule,
        FormsModule,
        NgxPaginationModule
    ]
})
export class PostModule { }
