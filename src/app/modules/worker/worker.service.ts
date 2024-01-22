import {DestroyRef, inject, Injectable} from '@angular/core';
import {map, Observable, of, Subscription, tap} from "rxjs";
import {CompanyDataInterface, CompanyResponseInterface} from "../company/models/Company.interface";
import {takeUntilDestroyed} from "@angular/core/rxjs-interop";
import {SpinnerService} from "../spinner/spinner.service";
import {HttpClient} from "@angular/common/http";
import {environment} from "../../../environments/environment";
import {CompanyService} from "../company/company.service";

@Injectable()
export class WorkerService {

  private readonly spinnerService = inject(SpinnerService);
  private readonly http = inject(HttpClient);
  private readonly destroyRef = inject(DestroyRef);
  private readonly baseApiUrl = environment.apiBaseUrl;

  constructor() { }

  private readonly companyListUrl =
    `${this.baseApiUrl}/companies`;
  getWorkersList(companyId: string | null) {
    const workersListUrl = `${this.companyListUrl}/${companyId}/workers`;

    return this.http
      .get<CompanyResponseInterface>(workersListUrl)
      .pipe(
        takeUntilDestroyed(this.destroyRef),
        tap((data) => console.log(data)),
        map((data) => data.data)
      ).subscribe()

  }
}
