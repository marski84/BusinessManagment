import { ApplicationConfig } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { provideAnimations } from '@angular/platform-browser/animations';
import {provideHttpClient, withInterceptors} from "@angular/common/http";
import {SpinnerService} from "./modules/spinner/spinner.service";
import {authInterceptor} from "./commons/AuthInterceptor/auth.interceptor";

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes),
    provideAnimations(),
    provideHttpClient(),
    provideHttpClient(withInterceptors([authInterceptor])),
    SpinnerService
  ]
};
