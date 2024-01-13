import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import {RouterModule, RouterOutlet} from '@angular/router';
import {HttpClientModule} from "@angular/common/http";
import {AuthModule} from "./modules/auth-module/auth.module";
import {PanelModule} from "./modules/panel/panel.module";
import {LoginService} from "./modules/auth-module/login.service";
import {LoginServiceRepository} from "./modules/auth-module/LoginServiceRepository";
import {SpinnerService} from "./modules/spinner/spinner.service";
import {SpinnerModule} from "./modules/spinner/spinner.module";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [HttpClientModule, CommonModule, RouterOutlet, AuthModule, PanelModule, SpinnerModule],
  providers: [LoginService, LoginServiceRepository],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'BusinessManagment';
}
