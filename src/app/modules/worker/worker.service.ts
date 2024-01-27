import {DestroyRef, inject, Injectable} from '@angular/core';
import {map, Observable, of, Subscription, tap} from "rxjs";
import {takeUntilDestroyed} from "@angular/core/rxjs-interop";
import {SpinnerService} from "../spinner/spinner.service";
import {HttpClient} from "@angular/common/http";
import {environment} from "../../../environments/environment";
import {CompanyWorkersResponseInterface} from "../../Shared/CompanyWorkers.interface";
import {WorkerData} from "../../Shared/WorkerData.interface";

@Injectable()
export class WorkerService {

  private readonly spinnerService = inject(SpinnerService);
  private readonly http = inject(HttpClient);
  private readonly destroyRef = inject(DestroyRef);
  private readonly baseApiUrl = environment.apiBaseUrl;

  constructor() { }

  private readonly companyListUrl =
    `${this.baseApiUrl}/companies`;

  private readonly workerApiBaseUrl = `${this.baseApiUrl}/workers`
  getWorkersList(companyId: string): Observable<WorkerData[]> {
    const workersListUrl = `${this.companyListUrl}/${companyId}/workers`;

    return this.http
      .get<CompanyWorkersResponseInterface>(workersListUrl)
      .pipe(
        takeUntilDestroyed(this.destroyRef),
        map((data) => data.data),
        tap((data) => console.log(data)),
      );
  };

// {
//   "_id": "6585b4fa41009f7f38bb2a4a",
//   "name": "Adam",
//   "surname": "Goodman",
//   "companyId": "6585b4fa41009f7f38bb2a49"
// }
  updateWorkerData() {
    return this.http.put(`${this.workerApiBaseUrl}/6585b4fa41009f7f38bb2a4a`,
      {
        _id: "6585b4fa41009f7f38bb2a4a",
        companyId: '6585b4fa41009f7f38bb2a49',
        name: 'test',
        surname: 'test',
        education: 'test'
    }).subscribe(data => console.log(data))
  }
}
