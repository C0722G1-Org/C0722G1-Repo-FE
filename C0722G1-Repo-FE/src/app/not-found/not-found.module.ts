import { NotFoundRoutingModule } from './not-found-routing.module';
import { NotFoundComponent } from './not-found/not-found.component';
import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

@NgModule({
  declarations: [NotFoundComponent],
  imports: [
    CommonModule,
    NotFoundRoutingModule
  ]
})
export class NotFoundModule { }
