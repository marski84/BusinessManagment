import {Component, DestroyRef, inject} from '@angular/core';
import {CompanyService} from "../../company/company.service";
import {filter, map, Observable, of, switchMap, tap} from "rxjs";
import {takeUntilDestroyed} from "@angular/core/rxjs-interop";
import {WorkerService} from "../worker.service";
import {WorkerData} from "../../../Shared/WorkerData.interface";
import {ProcessedCompanyWorkersDataInterface} from "../../../Shared/ProcessedCompanyWorkersData.interface";

@Component({
  selector: 'app-worker-list',
  templateUrl: './worker-list.component.html',
  styleUrl: './worker-list.component.css'
})
export class WorkerListComponent {

  private readonly destroyRef$= inject(DestroyRef);
  private readonly workerService = inject(WorkerService);
  private readonly companyService = inject(CompanyService);

 companySelected$: Observable<ProcessedCompanyWorkersDataInterface> = this.companyService.companySelected$
    .pipe(
      takeUntilDestroyed(this.destroyRef$),
      filter((companyData) => companyData !== null),
      switchMap((companyData) =>
        this.workerService.getWorkersList(companyData)),
      map(workerData => workerData),
      tap(data => console.log(data))
    )


  test() {
    this.workerService.updateWorkerData()
  }

}
