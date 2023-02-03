import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {PostComponentComponent} from './post-component/post-component.component';
import {PostCreateComponent} from './post-create/post-create.component';
import {PostEditComponent} from './post-edit/post-edit.component';
import {PostListComponent} from "./post-list/post-list.component";
import {PostChartComponent} from './post-chart/post-chart.component';

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
  /**
   * URL to view post stats and chart page
   * Author: DatTQ  ;  Date:02/02/2023
   */
  {
  path: 'list', component: PostListComponent
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
