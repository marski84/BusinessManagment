import {HttpErrorResponse, HttpInterceptorFn} from '@angular/common/http';
import {inject} from "@angular/core";
import {LoginService} from "./login.service";
import {catchError, throwError} from "rxjs";

export const authInterceptor: HttpInterceptorFn = (req, next) => {

  return next(req).pipe(
    catchError((err: HttpErrorResponse) => {
      if (err.status !== 200) {
        alert('Http error occured')
      }
      return throwError(err);
    }),
  );
};
