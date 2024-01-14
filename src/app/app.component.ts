import {Component, DestroyRef, inject, OnInit} from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  NavigationCancel,
  NavigationEnd,
  NavigationError,
  NavigationStart, ResolveEnd, ResolveStart,
  Router, RouterEvent,
  RouterModule,
  RouterOutlet
} from '@angular/router';
import {HttpClientModule} from "@angular/common/http";
import {AuthModule} from "./modules/auth-module/auth.module";
import {PanelModule} from "./modules/panel/panel.module";
import {LoginService} from "./modules/auth-module/login.service";
import {LoginServiceRepository} from "./modules/auth-module/LoginServiceRepository";
import {SpinnerService} from "./modules/spinner/spinner.service";
import {SpinnerModule} from "./modules/spinner/spinner.module";
import {tap} from "rxjs";
import {takeUntilDestroyed} from "@angular/core/rxjs-interop";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [HttpClientModule, CommonModule, RouterOutlet, AuthModule, PanelModule, SpinnerModule],
  providers: [LoginService, LoginServiceRepository],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  router = inject(Router);
  spinnerService = inject(SpinnerService);
  destroyRef = inject(DestroyRef);
  title = 'BusinessManagment';

  ngOnInit(): void {
    this.router.events
      .pipe(
        takeUntilDestroyed(this.destroyRef),
        tap((event: any) => this.handleEvent(event))
      )
      .subscribe()
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
