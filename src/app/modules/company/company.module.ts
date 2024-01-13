import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {MaterialModule} from "../material/material.module";
import {CompanyListComponent} from "./company-list/company-list.component";
import {CompanyDetailComponent} from "./company-detail/company-detail.component";
import {CompanyService} from "./company.service";
import {HttpClientModule} from "@angular/common/http";
import {SpinnerComponent} from "../spinner/spinner/spinner.component";
import {SpinnerModule} from "../spinner/spinner.module";



@NgModule({
  declarations: [CompanyListComponent, CompanyDetailComponent],
  imports: [
    CommonModule,
    HttpClientModule,
    MaterialModule,
    SpinnerModule
  ],
  exports: [
    CompanyListComponent
  ],
  providers: [
    CompanyService
  ]
})
export class CompanyModule { }
