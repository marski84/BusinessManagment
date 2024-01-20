import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {WorkerListComponent} from "./worker-list/worker-list.component";
import {WorkerFormComponent} from "./worker-form/worker-form.component";
import {provideHttpClient, withInterceptors} from "@angular/common/http";
import {authInterceptor} from "../../commons/AuthInterceptor/auth.interceptor";



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
  ],

  providers: [
    provideHttpClient(withInterceptors([authInterceptor]))
  ],
})
export class WorkerModule { }
