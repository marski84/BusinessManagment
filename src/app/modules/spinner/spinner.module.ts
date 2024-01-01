import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {SpinnerService} from "./spinner.service";
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import {SpinnerComponent} from "./spinner/spinner.component";



@NgModule({
  declarations: [SpinnerComponent],
  imports: [
    CommonModule,
    MatProgressSpinnerModule
  ],
  exports: [
    SpinnerComponent
  ],
  providers: [
    {provide: SpinnerService, useClass: SpinnerService}
  ]
})
export class SpinnerModule { }
