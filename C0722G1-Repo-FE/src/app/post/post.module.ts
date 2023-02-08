import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PostRoutingModule } from './post-routing.module';
import { PostCreateComponent } from './post-create/post-create.component';
import { PostEditComponent } from './post-edit/post-edit.component';
import { PostListComponent } from './post-list/post-list.component';
import { PostDeleteComponent } from './post-delete/post-delete.component';
import { PostDetailComponent } from './post-detail/post-detail.component';
import {NgxPaginationModule} from "ngx-pagination";
import { PostListCustomerComponent } from './post-list-customer/post-list-customer.component';
import {FormsModule} from "@angular/forms";


@NgModule({
  declarations: [PostCreateComponent, PostEditComponent, PostListComponent, PostDeleteComponent, PostDetailComponent, PostListCustomerComponent],
  imports: [
    CommonModule,
    PostRoutingModule,
    NgxPaginationModule,
    FormsModule
  ]
})
export class PostModule { }
