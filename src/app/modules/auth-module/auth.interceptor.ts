import {HttpErrorResponse, HttpInterceptorFn} from '@angular/common/http';
import {inject} from "@angular/core";
import {catchError, finalize, retry, tap, throwError} from "rxjs";
import {SpinnerService} from "../spinner/spinner.service";
import {StoreService} from "../../store.service";

export const authInterceptor: HttpInterceptorFn = (req, next) => {

  const storeService = inject(StoreService);
  const spinnerService = inject(SpinnerService);

  if (storeService.jwtToken) {
    console.log('interceptor')
    console.log(storeService.jwtToken)
    console.log(storeService.temp)
    req = req.clone({
      setHeaders: {
        Authorization: `Bearer ${storeService.jwtToken}`
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
