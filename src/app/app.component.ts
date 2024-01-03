import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import {RouterModule, RouterOutlet} from '@angular/router';
import {HttpClientModule} from "@angular/common/http";
import {AuthModule} from "./modules/auth-module/auth.module";
import {PanelModule} from "./modules/panel/panel.module";
import {LoginService} from "./modules/auth-module/login.service";
import {LoginServiceRepository} from "./modules/auth-module/LoginServiceRepository";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [HttpClientModule, CommonModule, RouterOutlet, AuthModule, PanelModule],
  providers: [

  ],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'BusinessManagment';
}
