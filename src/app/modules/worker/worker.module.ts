import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {WorkerListComponent} from "./worker-list/worker-list.component";
import {WorkerFormComponent} from "./worker-form/worker-form.component";
import {HttpClientModule, provideHttpClient, withInterceptors} from "@angular/common/http";
import {authInterceptor} from "../../commons/AuthInterceptor/auth.interceptor";
import {WorkerService} from "./worker.service";



@NgModule({
  declarations: [
    WorkerListComponent,
    WorkerFormComponent
  ],
  imports: [
    CommonModule,
    HttpClientModule
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
