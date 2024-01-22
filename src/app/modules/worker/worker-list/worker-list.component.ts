import {Component, DestroyRef, inject} from '@angular/core';
import {CompanyService} from "../../company/company.service";
import {filter, map, tap} from "rxjs";
import {takeUntilDestroyed} from "@angular/core/rxjs-interop";
import {WorkerService} from "../worker.service";

@Component({
  selector: 'app-worker-list',
  templateUrl: './worker-list.component.html',
  styleUrl: './worker-list.component.css'
})
export class WorkerListComponent {

  private readonly destroyRef$= inject(DestroyRef);
  private readonly workerService = inject(WorkerService);

 companySelected$ = inject(CompanyService).companySelected$
    .pipe(
      takeUntilDestroyed(this.destroyRef$),
      filter((companyId) => !!companyId),
      map((companyId) => this.workerService.getWorkersList(companyId))
    )


}
