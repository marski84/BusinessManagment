import { ResolveFn } from '@angular/router';
import {LoginService} from "./login.service";
import {inject} from "@angular/core";
import {Observable, retry} from "rxjs";
import {ApiResponseInterface} from "./models/ApiResponse.interface";
import {HttpClient} from "@angular/common/http";
import {StoreService} from "../../store.service";

export const userDataResolver: () => Observable<string> =
  (): Observable<string> => {
  // const loginService = inject(LoginService);
  const userDataUrl: string ='https://lobster-app-86syw.ondigitalocean.app/auth/user';
  const storeService = inject(StoreService);

  const temp = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY1OGRjYzYwNDEwMDlmN2YzOGJiMmE0YyIsImlhdCI6MTcwNDU1NjIyOCwiZXhwIjoxNzA0NjQyNjI4fQ.wiS7aFmyOGASsWFn1x2gzKNhx9NhwFksfjiOukTpOeA\n'
    const httpClient = inject(HttpClient);
    console.log('resolver')

  // return loginService.handleGetUserData();
    return httpClient.get<string>(userDataUrl, {
      headers: {
        Authorization: `Bearer ${temp}`
      }
    })
      .pipe(
        retry(3)
      )
};
