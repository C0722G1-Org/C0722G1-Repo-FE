import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PostRoutingModule } from './post-routing.module';
import { PostCreateComponent } from './post-create/post-create.component';
import { PostEditComponent } from './post-edit/post-edit.component';
import { PostListComponent } from './post-list/post-list.component';
import { PostDeleteComponent } from './post-delete/post-delete.component';
import { PostDetailComponent } from './post-detail/post-detail.component';


@NgModule({
  declarations: [PostCreateComponent, PostEditComponent, PostListComponent, PostDeleteComponent, PostDetailComponent],
  imports: [
    CommonModule,
    PostRoutingModule
  ]
})
export class PostModule { }
