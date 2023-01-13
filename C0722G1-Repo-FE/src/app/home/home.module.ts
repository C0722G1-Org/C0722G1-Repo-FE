import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HomeRoutingModule } from './home-routing.module';
import { FooterComponent } from './footer/footer.component';
import { HeaderComponent } from './header/header.component';
import { NavComponent } from './nav/nav.component';
import { HomeComponent } from './home/home.component';


@NgModule({
    declarations: [FooterComponent, HeaderComponent, NavComponent, HomeComponent],
  exports: [
    HomeComponent
  ],
    imports: [
        CommonModule,
        HomeRoutingModule
    ]
})
export class HomeModule { }
