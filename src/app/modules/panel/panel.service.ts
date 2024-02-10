import {DestroyRef, inject, Injectable, signal} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {environment} from "../../../environments/environment";
import {catchError, finalize, map, Observable, of, switchMap, tap, throwError} from "rxjs";
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
  private selectedCompany: CompanyDataInterface | null = null;

  workersList = signal<WorkerData[]>([]);

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
      tap(data => this.workersList.set(data)),
      tap((data) => console.log(data)),
      finalize(() => this.selectedCompany = companyData)
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
      .pipe(
        takeUntilDestroyed(this.destroyRef),
        switchMap(data =>
          this.getWorkersList(this.selectedCompany!))
      )
      .subscribe();
  }
}
