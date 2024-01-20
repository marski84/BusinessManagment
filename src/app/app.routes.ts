import { Routes } from '@angular/router';
import {HomeComponent} from "./modules/auth-module/home/home.component";
import {PanelComponent} from "./modules/panel/panel/panel.component";
import {userDataResolver} from "./modules/auth-module/user-data.resolver";
import {isLoggedGuard} from "./modules/auth-module/is-logged.guard";

// TODO: lazy loading
export const routes: Routes = [
  {
    path: '',
    component: HomeComponent
  },
  {
    path: 'panel',
    loadChildren: () => import('./modules/panel/panel.module').then(m => m.PanelModule),
    // component: PanelComponent,
    resolve: {userData: userDataResolver},
    canActivate: [isLoggedGuard],
  },

];
