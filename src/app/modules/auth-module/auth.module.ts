import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {LoginComponent} from "./login/login.component";
import {RegisterComponent} from "./register/register.component";
import {HomeComponent} from "./home/home.component";
import {AuthFomComponent} from "./auth-fom/auth-fom.component";



@NgModule({
  declarations: [
    LoginComponent,
    RegisterComponent,
    HomeComponent,
    AuthFomComponent
  ],
  imports: [
    CommonModule,
  ],
  exports: [
    HomeComponent
  ]
})
export class AuthModule { }
