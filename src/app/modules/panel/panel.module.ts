import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialModule } from '../material/material.module';
import { PanelHeaderComponent } from './panel-header/panel-header.component';
import { UserInfoComponent } from './user-info/user-info.component';
import { LogoutComponent } from './logout/logout.component';
import { PanelComponent } from './panel/panel.component';
import { CompanyModule } from '../company/company.module';
import { WorkerModule } from '../worker/worker.module';
import { RouterOutlet } from '@angular/router';
import { PanelRoutingModule } from './panel-routing.module';
import {CompanyService} from "../company/company.service";
import {provideHttpClient, withInterceptors} from "@angular/common/http";
import {authInterceptor} from "../../commons/AuthInterceptor/auth.interceptor";

@NgModule({
  declarations: [
    PanelComponent,
    PanelHeaderComponent,
    UserInfoComponent,
    LogoutComponent,
  ],
  imports: [
    CommonModule,
    MaterialModule,
    CompanyModule, // tutaj masz providowane serwisy
    WorkerModule, // tutaj masz providowane serwisy
    RouterOutlet,
    PanelRoutingModule,
  ],
  providers: [
    CompanyService,
    provideHttpClient(withInterceptors([authInterceptor]))
  ],
  exports: [PanelHeaderComponent, PanelComponent],
})
export class PanelModule {}
