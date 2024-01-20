import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {LoginComponent} from "./login/login.component";
import {RegisterComponent} from "./register/register.component";
import {HomeComponent} from "./home/home.component";
import { AuthFormComponent} from "./auth-fom/auth-form.component";
import {MaterialModule} from "../material/material.module";
import {ReactiveFormsModule} from "@angular/forms";
import {
  provideHttpClient,
  withInterceptors
} from "@angular/common/http";
import {LoginService} from "./login.service";
import {LoginServiceRepository} from "./LoginServiceRepository";
import {authInterceptor} from "./auth.interceptor";
import {PanelModule} from "../panel/panel.module";
import {SpinnerModule} from "../spinner/spinner.module";
import {RouterModule} from "@angular/router";



@NgModule({
  declarations: [
    LoginComponent,
    RegisterComponent,
    HomeComponent,
    AuthFormComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    ReactiveFormsModule,
    MaterialModule,
    SpinnerModule,
  ],
  exports: [
    HomeComponent
  ],
  providers: [
    LoginServiceRepository,
    LoginService,
    provideHttpClient(withInterceptors([authInterceptor]))
  ]
})
export class AuthModule { }
