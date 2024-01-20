import { DestroyRef, inject, Injectable } from '@angular/core';
import { StoreService } from '../../store.service';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { catchError, EMPTY, finalize, Observable, retry, tap } from 'rxjs';
import { SpinnerService } from '../spinner/spinner.service';
import { CompanyInterface } from './models/Company.interface';
import { CompanyWorkersInterface } from './models/CompanyWorkers.interface';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

@Injectable()
export class CompanyService {
  private readonly storeService = inject(StoreService);
  private readonly spinnerService = inject(SpinnerService);
  private readonly http = inject(HttpClient);
  private readonly destroyRef = inject(DestroyRef);
  private readonly headerOptions = { // TODO: przenieść do interceptora
    headers: {
      Authorization: `Bearer ${this.storeService.jwtToken}`,
    },
  };

  private readonly companyListUrl =
    'https://lobster-app-86syw.ondigitalocean.app/companies';

  constructor() {}

  getCompanyList(): Observable<CompanyInterface> {
    return this.http
      .get<CompanyInterface>(this.companyListUrl, this.headerOptions)
      .pipe(
        takeUntilDestroyed(this.destroyRef),
        tap(() => this.spinnerService.show()),
        retry(3),
        catchError((err: HttpErrorResponse) => {
          this.spinnerService.hide();
          return EMPTY;
          // throw
        }),
        finalize(() => this.spinnerService.hide())
      );
  }

  getWorkersList(companyId: string) {
    const workersListUrl = `${this.companyListUrl}/${companyId}/workers`;

    return this.http
      .get<CompanyWorkersInterface>(workersListUrl, this.headerOptions)
      .pipe(
        takeUntilDestroyed(this.destroyRef),
        tap((data) => console.log(data))
      );
  }
}
