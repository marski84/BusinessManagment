import {ChangeDetectionStrategy, Component, DestroyRef, inject, Input} from '@angular/core';
import {WorkerData} from "../../../Shared/WorkerData.interface";
import {WorkerFormComponent} from "../worker-form/worker-form.component";
import {MatDialog, MatDialogConfig} from "@angular/material/dialog";
import {WorkerService} from "../worker.service";
import {filter, tap} from "rxjs";
import {Dialog} from "@angular/cdk/dialog";
import {takeUntilDestroyed} from "@angular/core/rxjs-interop";

@Component({
  selector: 'app-worker-details',
  templateUrl: './worker-details.component.html',
  styleUrl: './worker-details.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class WorkerDetailsComponent {
  private readonly workerService = inject(WorkerService);
  private readonly dialog = inject(MatDialog);
  private readonly destoyRef = inject(DestroyRef);

  @Input()
  workerData!: WorkerData;


  handleEditWorkerData() {
    const dialogRef = this.dialog.open(WorkerFormComponent, {
      disableClose: true,
      hasBackdrop: true,
      data : this.workerData
    })

    dialogRef.afterClosed()
      .pipe(
        takeUntilDestroyed(this.destoyRef),
        filter((data) => data),
        tap(data => this.workerService.updateWorkerData(data))
      )
      .subscribe(data => console.log(data))
  }
  //

// {
//   "_id": "6585b4fa41009f7f38bb2a4a",
//   "name": "Adam",
//   "surname": "Goodman",
//   "companyId": "6585b4fa41009f7f38bb2a49"
// }
//

}
