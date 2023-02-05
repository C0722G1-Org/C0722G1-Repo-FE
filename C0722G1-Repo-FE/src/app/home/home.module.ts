import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HomeRoutingModule } from './home-routing.module';
import { FooterComponent } from './footer/footer.component';
import { HeaderComponent } from './header/header.component';
import { NavComponent } from './nav/nav.component';
import { HomeComponent } from './home/home.component';
import {ReactiveFormsModule} from "@angular/forms";
import {SecurityModule} from "../security/security.module";


@NgModule({
    declarations: [FooterComponent, HeaderComponent, NavComponent, HomeComponent],
    exports: [
        HomeComponent,
        HeaderComponent
    ],
  imports: [
    CommonModule,
    HomeRoutingModule,
    ReactiveFormsModule,
    SecurityModule
  ]
})
export class HomeModule { }
