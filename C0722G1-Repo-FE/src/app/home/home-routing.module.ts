import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {PostListComponent} from '../post/post-list/post-list.component';
import {HomeComponent} from './home/home.component';


const routes: Routes = [
  {
    path: '', component: HomeComponent, data: {title: 'Trang chủ'}
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HomeRoutingModule {
}
