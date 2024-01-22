import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialModule } from '../material/material.module';
import { CompanyListComponent } from './company-list/company-list.component';
import { CompanyDetailComponent } from './company-detail/company-detail.component';
import { CompanyService } from './company.service';
import { HttpClientModule, provideHttpClient, withInterceptors} from '@angular/common/http';
import { SpinnerModule } from '../spinner/spinner.module';
import {authInterceptor} from "../../commons/AuthInterceptor/auth.interceptor";

@NgModule({
  declarations: [CompanyListComponent, CompanyDetailComponent],
  imports: [
    CommonModule,
    HttpClientModule,
    MaterialModule,
    SpinnerModule
  ],
  exports: [CompanyListComponent],
  providers: [
    CompanyService,
    provideHttpClient(withInterceptors([authInterceptor]))
  ],
})
export class CompanyModule {}
