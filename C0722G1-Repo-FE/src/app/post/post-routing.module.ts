import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {PostComponentComponent} from './post-component/post-component.component';
import {PostCreateComponent} from './post-create/post-create.component';
import {PostEditComponent} from './post-edit/post-edit.component';
import {PostChartComponent} from './post-chart/post-chart.component';
import {PostListApprovalComponent} from './post-list-approval/post-list-approval.component';

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
    path: 'chart', component: PostChartComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PostRoutingModule {
}
