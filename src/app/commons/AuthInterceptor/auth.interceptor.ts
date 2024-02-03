import {HttpErrorResponse, HttpInterceptorFn} from '@angular/common/http';
import {inject} from "@angular/core";
import {catchError, finalize, retry, tap, throwError} from "rxjs";
import {StoreService} from "../../store.service";
import {SpinnerService} from "../../modules/spinner/spinner.service";


export const authInterceptor: HttpInterceptorFn = (req, next) => {
  console.log('interceptor!' + req.url)

  const storeService = inject(StoreService);
  const spinnerService = inject(SpinnerService);

  if (storeService.jwtToken) {
    console.log(storeService.jwtToken)
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
      retry(3),
      catchError((err: HttpErrorResponse) => {
        spinnerService.hide()
        return throwError(err);
      }),
      catchError((err: HttpErrorResponse) => {
        if (err.status !== 200) {
        alert('Http error occured')
      }
      return throwError(() => err);
    }),
      finalize(() => {
            spinnerService.hide()
      })
  );
};
