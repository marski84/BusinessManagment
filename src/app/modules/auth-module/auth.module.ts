import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {LoginComponent} from "./login/login.component";
import {RegisterComponent} from "./register/register.component";
import {HomeComponent} from "./home/home.component";
import { AuthFormComponent} from "./auth-fom/auth-form.component";
import {MaterialModule} from "../material/material.module";
import {ReactiveFormsModule} from "@angular/forms";
import {HttpClientModule} from "@angular/common/http";
import {LoginService} from "./login.service";
import {LoginServiceRepository} from "./LoginServiceRepository";



@NgModule({
  declarations: [
    LoginComponent,
    RegisterComponent,
    HomeComponent,
    AuthFormComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MaterialModule,
    HttpClientModule
  ],
  exports: [
    HomeComponent
  ],
  providers: [
    LoginService,
    LoginServiceRepository
  ]
})
export class AuthModule { }
