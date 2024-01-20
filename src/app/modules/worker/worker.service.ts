import {DestroyRef, inject, Injectable} from '@angular/core';
import {map, Observable, tap} from "rxjs";
import {CompanyDataInterface, CompanyResponseInterface} from "../company/models/Company.interface";
import {takeUntilDestroyed} from "@angular/core/rxjs-interop";
import {SpinnerService} from "../spinner/spinner.service";
import {HttpClient} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class WorkerService {

  private readonly spinnerService = inject(SpinnerService);
  private readonly http = inject(HttpClient);
  private readonly destroyRef = inject(DestroyRef);

  constructor() { }

  private readonly companyListUrl =
    'https://lobster-app-86syw.ondigitalocean.app/companies';
  getWorkersList(companyId: string): Observable<CompanyDataInterface[]> {
    const workersListUrl = `${this.companyListUrl}/${companyId}/workers`;
    return this.http
      .get<CompanyResponseInterface>(workersListUrl)
      .pipe(
        takeUntilDestroyed(this.destroyRef),
        tap((data) => console.log(data)),
        map((data) => data.data)
      );
  }
}
