import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {WorkerListComponent} from "./worker-list/worker-list.component";
import {WorkerFormComponent} from "./worker-form/worker-form.component";
import {HttpClientModule, provideHttpClient, withInterceptors} from "@angular/common/http";
import {authInterceptor} from "../../commons/AuthInterceptor/auth.interceptor";
import {WorkerService} from "./worker.service";
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
  ],
  providers: [
    WorkerService,
  ],
})
export class WorkerModule { }
