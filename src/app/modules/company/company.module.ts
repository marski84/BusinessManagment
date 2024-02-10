import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialModule } from '../material/material.module';
import { CompanyListComponent } from './company-list/company-list.component';
import { CompanyDetailComponent } from './company-detail/company-detail.component';
import { SpinnerModule } from '../spinner/spinner.module';

@NgModule({
  declarations: [CompanyListComponent, CompanyDetailComponent],
  imports: [
    CommonModule,
    MaterialModule,
    SpinnerModule
  ],
  exports: [CompanyListComponent],

})
export class CompanyModule {}
