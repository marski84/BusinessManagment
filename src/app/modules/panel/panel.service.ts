import {DestroyRef, inject, Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {environment} from "../../../environments/environment";
import {catchError, map, Observable, of, tap, throwError} from "rxjs";
import {CompanyDataInterface, CompanyResponseInterface} from "../../Shared/Company.interface";
import {takeUntilDestroyed} from "@angular/core/rxjs-interop";
import {WorkerData} from "../../Shared/WorkerData.interface";
import {CompanyWorkersResponseInterface} from "../../Shared/CompanyWorkers.interface";

@Injectable({
  providedIn: 'root'
})
export class PanelService {

  private readonly http = inject(HttpClient);
  private readonly destroyRef = inject(DestroyRef);
  private readonly baseApiUrl = environment.apiBaseUrl;
  private readonly companyListUrl = `${this.baseApiUrl}/companies`;
  private readonly workerApiBaseUrl = `${this.baseApiUrl}/workers`;

  constructor() {}

  ngOnInit(): void {}

  getCompanyList(): Observable<CompanyDataInterface[]> {
    return this.http
      .get<CompanyResponseInterface>(`${this.baseApiUrl}/companies`)
      .pipe(
        takeUntilDestroyed(this.destroyRef),
        map((data) => data.data)
      );
  }


  getWorkersList(companyData: CompanyDataInterface): Observable<WorkerData[]> {
    const workersListUrl = `${this.companyListUrl}/${companyData._id}/workers`;
    console.log('worker list');
    console.log(companyData);

    return this.http.get<CompanyWorkersResponseInterface>(workersListUrl).pipe(
      takeUntilDestroyed(this.destroyRef),
      catchError((err) => {
        console.log(err);
        return throwError(() => of(err));
      }),
      map((data) => {
        const employees = data.data;
        employees.forEach(
          (employee) => (employee.companyName = companyData.name)
        );
        return employees

      }),
      tap((data) => console.log(data))
    );
  }
  updateWorkerData(workerUpdatedData: WorkerData) {
    console.log(workerUpdatedData);
    return this.http
      .put(`${this.workerApiBaseUrl}/${workerUpdatedData._id}`, {
        _id: workerUpdatedData._id,
        companyId: workerUpdatedData.companyId,
        name: workerUpdatedData.name,
        surname: workerUpdatedData.surname,
        education: workerUpdatedData.education,
      })
      .subscribe((success) => {
        // this.companyService.companySelected$.next(<CompanyDataInterface>{
        //   _id: workerUpdatedData.companyId,
        //   name: workerUpdatedData.companyName,
        // });
      });
  }
}
