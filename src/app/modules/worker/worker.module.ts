import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {WorkerListComponent} from "./worker-list/worker-list.component";
import {WorkerFormComponent} from "./worker-form/worker-form.component";
import {HttpClientModule} from "@angular/common/http";
import {WorkerDetailsComponent} from "./worker-details/worker-details.component";
import {MaterialModule} from "../material/material.module";
import {ReactiveFormsModule} from "@angular/forms";



@NgModule({
  declarations: [
    WorkerListComponent,
    WorkerFormComponent,
    WorkerDetailsComponent
  ],
  imports: [
    CommonModule,
    HttpClientModule,
    MaterialModule,
    ReactiveFormsModule,

  ],
  exports: [
    WorkerListComponent
  ]
})
export class WorkerModule { }
