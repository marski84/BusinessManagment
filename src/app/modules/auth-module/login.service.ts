import {DestroyRef, inject, Injectable} from '@angular/core';
import {LoginServiceRepository} from "./LoginServiceRepository";
import {FormDataInterface} from "./auth-fom/FormData.interface";
import {takeUntilDestroyed} from "@angular/core/rxjs-interop";
import {tap} from "rxjs";
import {Router} from "@angular/router";

@Injectable()
export class LoginService {
  destroyRef$ = inject(DestroyRef);
  urlRepository: LoginServiceRepository = inject(LoginServiceRepository);
  router = inject(Router);
  jwtToken = '';

  constructor() { }

  handleSignIn(userData: FormDataInterface) {
  this.urlRepository.signIn(userData)
    .pipe(
      takeUntilDestroyed(this.destroyRef$),
      tap(response => this.handleResponse(response))
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
  private handleResponse(response: any) {
    console.log(response)

    this.jwtToken = response;
    this.router.navigate(['/home'])


  }
}
