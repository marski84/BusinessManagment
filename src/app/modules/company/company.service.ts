import { DestroyRef, inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {BehaviorSubject, map, Observable, ReplaySubject, Subject} from 'rxjs';
import { SpinnerService } from '../spinner/spinner.service';
import {CompanyDataInterface, CompanyResponseInterface} from '../../Shared/Company.interface';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import {environment} from "../../../environments/environment";

@Injectable()
export class CompanyService {
  private readonly spinnerService = inject(SpinnerService);
  private readonly http = inject(HttpClient);
  private readonly destroyRef = inject(DestroyRef);
  private readonly companyListUrl =environment.apiBaseUrl;

  companySelected$ = new ReplaySubject<CompanyDataInterface>(1);
  // <CompanyDataInterface>();

  constructor() {}

  getCompanyList(): Observable<CompanyDataInterface[]> {
    return this.http
      .get<CompanyResponseInterface>(`${this.companyListUrl}/companies`)
      .pipe(
        takeUntilDestroyed(this.destroyRef),
        map((data) => data.data),
      );
  }


}
