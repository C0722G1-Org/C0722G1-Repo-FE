import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {PostComponentComponent} from './post-component/post-component.component';
import {PostCreateComponent} from './post-create/post-create.component';
import {PostEditComponent} from './post-edit/post-edit.component';
import {PostListComponent} from './post-list/post-list.component';

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
    path: 'list', component: PostListComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PostRoutingModule {
}
