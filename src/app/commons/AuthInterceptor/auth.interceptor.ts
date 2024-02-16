import {HttpErrorResponse, HttpInterceptorFn} from '@angular/common/http';
import {inject} from "@angular/core";
import {catchError, EMPTY, finalize, of, retry, tap, throwError} from "rxjs";
import {StoreService} from "../../store.service";
import {SpinnerService} from "../../modules/spinner/spinner.service";


export const authInterceptor: HttpInterceptorFn = (req, next) => {

  const storeService = inject(StoreService);
  const spinnerService = inject(SpinnerService);

  if (storeService.jwtToken) {
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
