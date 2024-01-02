import {HttpErrorResponse, HttpInterceptorFn} from '@angular/common/http';
import {inject} from "@angular/core";
import {LoginService} from "./login.service";
import {catchError, finalize, retry, tap, throwError} from "rxjs";
import {SpinnerService} from "../spinner/spinner.service";

export const authInterceptor: HttpInterceptorFn = (req, next) => {

  const loginService = inject(LoginService);
  const spinnerService = inject(SpinnerService);

  if (loginService.jwtToken) {
    req = req.clone({
      setHeaders: {
        Authorization: `Bearer ${loginService.jwtToken}`
      }
    })
  }

  return next(req)
    .pipe(
      tap(() => {
        spinnerService.show()
      }),
      catchError((err: HttpErrorResponse) => {
        spinnerService.hide()
        return throwError(err);
      }),
      retry(2),
      catchError((err: HttpErrorResponse) => {
        if (err.status !== 200) {
        alert('Http error occured')
      }
      return throwError(err);
    }),
      finalize(() => {
            spinnerService.hide()
      })
  );
};
