import { DestroyRef, inject, Injectable } from '@angular/core';
import { StoreService } from '../../store.service';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import {catchError, EMPTY, finalize, map, Observable, of, retry, tap, throwError} from 'rxjs';
import { SpinnerService } from '../spinner/spinner.service';
import {CompanyDataInterface, CompanyResponseInterface} from './models/Company.interface';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

@Injectable()
export class CompanyService {
  private readonly spinnerService = inject(SpinnerService);
  private readonly http = inject(HttpClient);
  private readonly destroyRef = inject(DestroyRef);

  private readonly companyListUrl =
    'https://lobster-app-86syw.ondigitalocean.app/companies';

  constructor() {}

  getCompanyList(): Observable<CompanyDataInterface[]> {
    return this.http
      .get<CompanyResponseInterface>(this.companyListUrl)
      .pipe(
        takeUntilDestroyed(this.destroyRef),
        tap(() => this.spinnerService.show()),
        map((data) => data.data),
        // retry(3),
        // catchError((err: HttpErrorResponse) => {
        //   this.spinnerService.hide()
        //   return throwError(() => err)
        // }),
        finalize(() => this.spinnerService.hide())
      );
  }


}
