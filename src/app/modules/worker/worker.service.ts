import {DestroyRef, inject, Injectable} from '@angular/core';
import {map, Observable, tap} from "rxjs";
import {takeUntilDestroyed} from "@angular/core/rxjs-interop";
import {SpinnerService} from "../spinner/spinner.service";
import {HttpClient} from "@angular/common/http";
import {environment} from "../../../environments/environment";
import {CompanyWorkersResponseInterface} from "../../Shared/CompanyWorkers.interface";
import {CompanyDataInterface} from "../../Shared/Company.interface";
import {ProcessedCompanyWorkersDataInterface} from "../../Shared/ProcessedCompanyWorkersData.interface";

@Injectable()
export class WorkerService {

  private readonly spinnerService = inject(SpinnerService);
  private readonly http = inject(HttpClient);
  private readonly destroyRef = inject(DestroyRef);
  private readonly baseApiUrl = environment.apiBaseUrl;

  constructor() { }

  // http://universities.hipolabs.com/search?country=Poland

  private readonly companyListUrl =
    `${this.baseApiUrl}/companies`;

  private readonly workerApiBaseUrl = `${this.baseApiUrl}/workers`
  getWorkersList(companyData: CompanyDataInterface): Observable<ProcessedCompanyWorkersDataInterface> {
    const workersListUrl = `${this.companyListUrl}/${companyData._id}/workers`;

    return this.http
      .get<CompanyWorkersResponseInterface>(workersListUrl)
      .pipe(
        takeUntilDestroyed(this.destroyRef),
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
