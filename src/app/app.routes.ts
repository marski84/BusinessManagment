import { Routes } from '@angular/router';
import {HomeComponent} from "./modules/auth-module/home/home.component";
import {userDataResolver} from "./modules/auth-module/user-data.resolver";
import {isLoggedGuard} from "./modules/auth-module/is-logged.guard";
import {WorkerFormComponent} from "./modules/worker/worker-form/worker-form.component";

export const routes: Routes = [
  {
    path: '',
    component: HomeComponent
  },
  {
    path: 'panel',
    loadChildren: () => import('./modules/panel/panel.module').then(m => m.PanelModule),
    resolve: {userData: userDataResolver},
    canActivate: [isLoggedGuard],
  },

  {
    path: 'form',
    component: WorkerFormComponent
  }

];
