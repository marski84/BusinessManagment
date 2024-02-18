import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {WorkerListComponent} from "./worker-list/worker-list.component";
import {WorkerFormComponent} from "./worker-form/worker-form.component";
import {HttpClientModule} from "@angular/common/http";
import {WorkerDetailsComponent} from "./worker-details/worker-details.component";
import {MaterialModule} from "../material/material.module";
import {ReactiveFormsModule} from "@angular/forms";
import {SpinnerModule} from "../spinner/spinner.module";
import {RegisterWorkerDirective} from "./register-worker.directive";
import {DeleteWorkerDirective} from "./delete-worker.directive";



@NgModule({
  declarations: [
    WorkerListComponent,
    WorkerFormComponent,
    WorkerDetailsComponent,
    RegisterWorkerDirective,
    DeleteWorkerDirective
  ],
  imports: [
    CommonModule,
    HttpClientModule,
    MaterialModule,
    ReactiveFormsModule,
    SpinnerModule,

  ],
  exports: [
    WorkerListComponent
  ]
})
export class WorkerModule { }
