import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {MaterialModule} from "../material/material.module";
import {PanelHeaderComponent} from "./panel-header/panel-header.component";
import {UserInfoComponent} from "./user-info/user-info.component";
import {LogoutComponent} from "./logout/logout.component";
import {PanelComponent} from "./panel/panel.component";
import {CompanyModule} from "../company/company.module";



@NgModule({
  declarations: [
    PanelComponent,
    PanelHeaderComponent,
    UserInfoComponent,
    LogoutComponent
  ],
  imports: [
    CommonModule,
    MaterialModule,
    CompanyModule
  ],
  exports: [
    PanelHeaderComponent,
    PanelComponent
  ]
})
export class PanelModule { }
