import { Component, DestroyRef, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  NavigationCancel,
  NavigationEnd,
  NavigationError,
  NavigationStart,
  ResolveEnd,
  ResolveStart,
  Router,
  RouterEvent,
  RouterOutlet,
} from '@angular/router';
import { AuthModule } from './modules/auth-module/auth.module';
import { SpinnerService } from './modules/spinner/spinner.service';
import { SpinnerModule } from './modules/spinner/spinner.module';
import { tap } from 'rxjs';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { MaterialModule } from './modules/material/material.module';
import {HttpClientModule, provideHttpClient, withInterceptors} from '@angular/common/http';
import { authInterceptor } from './commons/AuthInterceptor/auth.interceptor';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    CommonModule,
    RouterOutlet,
    AuthModule,
    SpinnerModule,
    MaterialModule,
    // HttpClientModule
  ],
  providers: [
  ],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  readonly router = inject(Router);
  readonly spinnerService = inject(SpinnerService);
  readonly destroyRef = inject(DestroyRef);
  readonly title = 'BusinessManagment';

  ngOnInit(): void {
    this.router.events
      .pipe(
        takeUntilDestroyed(this.destroyRef),
        tap((event: any) => this.handleEvent(event))
      )
      .subscribe();
  }

  private handleEvent(event: RouterEvent) {
    if (event instanceof NavigationStart || event instanceof ResolveStart) {
      this.spinnerService.show();
    }
    if (event instanceof NavigationEnd || event instanceof ResolveEnd) {
      this.spinnerService.hide();
    }

    // Set loading state to false in both of the below events to hide the spinner in case a request fails
    if (event instanceof NavigationCancel) {
      this.spinnerService.hide();
    }
    if (event instanceof NavigationError) {
      this.spinnerService.hide();
    }
  }
}
