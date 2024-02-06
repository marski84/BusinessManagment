import {Component, DestroyRef, inject} from '@angular/core';
import {CompanyService} from "../../company/company.service";
import {catchError, EMPTY, filter, ignoreElements, map, Observable, of, switchMap, tap, throwError} from "rxjs";
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

 companySelected$: Observable<WorkerData[]> = this.companyService.companySelected$
    .pipe(
      catchError(err => throwError(() => {
        console.log(err)
        return EMPTY
      })),
      tap(()=>console.log('company selected')),
      takeUntilDestroyed(this.destroyRef$),
      // filter((companyData) => companyData !== null),
      switchMap((companyData) => //
        this.workerService.getWorkersList(companyData)
      ),
    )

  companySelectedError$ = this.companySelected$
    .pipe(
      ignoreElements(),
      catchError(err => of(err))
    )


  // test() {
  //   this.workerService.updateWorkerData()
  // }

}
