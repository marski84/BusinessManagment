import { ResolveFn } from '@angular/router';
import {LoginService} from "./login.service";
import {inject} from "@angular/core";
import {Observable} from "rxjs";
import {ApiResponseInterface} from "./models/ApiResponse.interface";
import {HttpClient} from "@angular/common/http";

export const userDataResolver: ResolveFn<ApiResponseInterface> =
  (): Observable<ApiResponseInterface> => {
  const loginService = inject(LoginService);
  const httpClient = inject(HttpClient);
    console.log('resolver')

  return loginService.handleGetUserData();
};
