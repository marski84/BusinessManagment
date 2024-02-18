import {DestroyRef, inject, Injectable, OnInit, signal} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {environment} from "../../../environments/environment";
import {catchError, filter, finalize, map, Observable, of, Subject, switchMap, tap, throwError} from "rxjs";
import {CompanyDataInterface, CompanyResponseInterface} from "../../Shared/Company.interface";
import {takeUntilDestroyed} from "@angular/core/rxjs-interop";
import {WorkerData} from "../../Shared/WorkerData.interface";
import {CompanyWorkersResponseInterface} from "../../Shared/CompanyWorkers.interface";
import {NewWorkerData} from "../worker/register-worker.directive";

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

  get selectedCompanyId() {
    if (!this.selectedCompany) {
      return
    }
    return this.selectedCompany?._id
  }

  workersList = signal<WorkerData[]>([]);

  constructor() {}


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
      finalize(() => this.selectedCompany = companyData)
    );
  }

  createWorker(workerData: NewWorkerData) {
    return this.http
      .post<WorkerData>(`${this.workerApiBaseUrl}`,
        workerData)
      .pipe(
        takeUntilDestroyed(this.destroyRef),
        switchMap((resp ) => {
          return this.getWorkersList(this.selectedCompany!)
        })
      )
      .subscribe();
  }

  deleteWorker(workerId: string) {
    return this.http
      .delete<WorkerData>(`${this.workerApiBaseUrl}/${workerId}`)
      .pipe(
        takeUntilDestroyed(this.destroyRef),
        switchMap((resp ) => {
          return this.getWorkersList(this.selectedCompany!)
        })
      )
      .subscribe();
  }
  updateWorkerData(workerUpdatedData: WorkerData) {
    return this.http
      .put<
        {
          message: string,
          data: WorkerData,
        }
        >(`${this.workerApiBaseUrl}/${workerUpdatedData._id}`, {
        _id: workerUpdatedData._id,
        companyId: workerUpdatedData.companyId,
        name: workerUpdatedData.name,
        surname: workerUpdatedData.surname,
        university: workerUpdatedData.university,
      })
      .pipe(
        takeUntilDestroyed(this.destroyRef),
        switchMap((resp ) => {
          if(workerUpdatedData.university !== '') {
            this.notifyWorker(workerUpdatedData);
          }
          return this.getWorkersList(this.selectedCompany!)
        })
      )
      .subscribe();
  }


  notifyWorker(worker: WorkerData) {
    return this.http.get<any>(`${this.workerApiBaseUrl}/${worker._id}/notify`)
      .pipe(
        takeUntilDestroyed(this.destroyRef),
      )
      .subscribe()
  }
}
