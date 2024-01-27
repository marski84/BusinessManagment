import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {WorkerListComponent} from "./worker-list/worker-list.component";
import {WorkerFormComponent} from "./worker-form/worker-form.component";
import {HttpClientModule, provideHttpClient, withInterceptors} from "@angular/common/http";
import {authInterceptor} from "../../commons/AuthInterceptor/auth.interceptor";
import {WorkerService} from "./worker.service";
import {WorkerDetailsComponent} from "./worker-details/worker-details.component";
import {MaterialModule} from "../material/material.module";



@NgModule({
  declarations: [
    WorkerListComponent,
    WorkerFormComponent,
    WorkerDetailsComponent
  ],
  imports: [
    CommonModule,
    HttpClientModule,
    MaterialModule
  ],
  exports: [
    WorkerListComponent
  ],
  providers: [
    WorkerService,
    provideHttpClient(withInterceptors([authInterceptor]))
  ],
})
export class WorkerModule { }
