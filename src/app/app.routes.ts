import { Routes } from '@angular/router';
import {HomeComponent} from "./modules/auth-module/home/home.component";
import {PanelComponent} from "./modules/panel/panel/panel.component";
import {userDataResolver} from "./modules/auth-module/user-data.resolver";

export const routes: Routes = [
  {
    path: '',
    component: HomeComponent
  },
  {
    path:'panel',
    component: PanelComponent,
    resolve: {userData: userDataResolver}
  }
];
