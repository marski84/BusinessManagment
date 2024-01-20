import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {WorkerListComponent} from "./worker-list/worker-list.component";
import {WorkerFormComponent} from "./worker-form/worker-form.component";



@NgModule({
  declarations: [
    WorkerListComponent,
    WorkerFormComponent
  ],
  imports: [
    CommonModule,
  ],
  exports: [
    WorkerListComponent
  ]
})
export class WorkerModule { }
