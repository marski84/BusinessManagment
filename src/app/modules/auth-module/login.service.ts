import {DestroyRef, inject, Injectable} from '@angular/core';
import {LoginServiceRepository} from "./LoginServiceRepository";
import {FormDataInterface} from "./models/FormData.interface";
import {takeUntilDestroyed} from "@angular/core/rxjs-interop";
import {tap} from "rxjs";
import {Router} from "@angular/router";
import {AuthResponseInterface} from "./models/AuthResponse.interface";
import {StoreService} from "../../store.service";

@Injectable(
)
export class LoginService {
  destroyRef$ = inject(DestroyRef);
  urlRepository: LoginServiceRepository = inject(LoginServiceRepository);
  storeService: StoreService = inject(StoreService);
  router = inject(Router);


  handleSignIn(userData: FormDataInterface) {
  this.urlRepository.signIn(userData)
    .pipe(
      tap(response => this.handleResponse(response)),
      takeUntilDestroyed(this.destroyRef$),
    )
    .subscribe()
  }

  handleSignUp(userData: FormDataInterface) {
    this.urlRepository.signUp(userData)
      .pipe(
        takeUntilDestroyed(this.destroyRef$),
        tap(response => this.handleResponse(response))
      )
      .subscribe()
  }


  // handle sign up and store the token in service, then navigate to authorized part of the app
  private handleResponse(response: AuthResponseInterface) {

    this.storeService.jwtToken = response.accessToken;
    this.router.navigate(['panel'])


  }
}
