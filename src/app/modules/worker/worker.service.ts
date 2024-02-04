import {DestroyRef, inject, Injectable} from '@angular/core';
import {catchError, EMPTY, map, Observable, of, tap, throwError} from "rxjs";
import {takeUntilDestroyed} from "@angular/core/rxjs-interop";
import {SpinnerService} from "../spinner/spinner.service";
import {HttpClient} from "@angular/common/http";
import {environment} from "../../../environments/environment";
import {CompanyWorkersResponseInterface} from "../../Shared/CompanyWorkers.interface";
import {CompanyDataInterface} from "../../Shared/Company.interface";
import {ProcessedCompanyWorkersDataInterface} from "../../Shared/ProcessedCompanyWorkersData.interface";
import {WorkerData} from "../../Shared/WorkerData.interface";
import {CompanyService} from "../company/company.service";

@Injectable()
export class WorkerService {

  private readonly spinnerService = inject(SpinnerService);
  private readonly http = inject(HttpClient);
  private readonly destroyRef = inject(DestroyRef);
  private readonly baseApiUrl = environment.apiBaseUrl;
  private readonly companyService = inject(CompanyService);

  constructor() { }

  // http://universities.hipolabs.com/search?country=Poland

  private readonly companyListUrl =
    `${this.baseApiUrl}/companies`;

  private readonly workerApiBaseUrl = `${this.baseApiUrl}/workers`
  getWorkersList(companyData: CompanyDataInterface): Observable<ProcessedCompanyWorkersDataInterface> {
    const workersListUrl = `${this.companyListUrl}/${companyData._id}/workers`;
    console.log('worker list')
    console.log(companyData)

    return this.http
      .get<CompanyWorkersResponseInterface>(workersListUrl)
      .pipe(
        takeUntilDestroyed(this.destroyRef),
        catchError((err) => {
          console.log(err);
          return throwError(() => of(err));
        }),
        map((data): ProcessedCompanyWorkersDataInterface => {
          const employees = data.data;
          employees.forEach(employee => employee.companyName = companyData.name)
          return {
            employees: employees
          }
        }),
        tap((data) => console.log(data)),
      );
  };

// {
//   "_id": "6585b4fa41009f7f38bb2a4a",
//   "name": "Adam",
//   "surname": "Goodman",
//   "companyId": "6585b4fa41009f7f38bb2a49"
// }
  updateWorkerData(workerUpdatedData: WorkerData) {
    console.log(workerUpdatedData)
    return this.http.put(`${this.workerApiBaseUrl}/${workerUpdatedData._id}`,
      {
        _id: workerUpdatedData._id,
        companyId: workerUpdatedData.companyId,
        name: workerUpdatedData.name,
        surname: workerUpdatedData.surname,
        education: workerUpdatedData.education
    }).subscribe(
      (success) => {
        this.companyService.companySelected$.next(
          <CompanyDataInterface>{
            _id: workerUpdatedData.companyId,
            name: workerUpdatedData.companyName
          }
        )
      }
    )

  }
}
