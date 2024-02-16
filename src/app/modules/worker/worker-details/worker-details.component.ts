import {ChangeDetectionStrategy, Component, DestroyRef, EventEmitter, inject, Input, Output} from '@angular/core';
import {WorkerData} from "../../../Shared/WorkerData.interface";
import {WorkerFormComponent} from "../worker-form/worker-form.component";
import {MatDialog} from "@angular/material/dialog";
import {filter, tap} from "rxjs";
import {takeUntilDestroyed} from "@angular/core/rxjs-interop";

@Component({
  selector: 'app-worker-details',
  templateUrl: './worker-details.component.html',
  styleUrl: './worker-details.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class WorkerDetailsComponent {
  private readonly dialog = inject(MatDialog);
  private readonly destroyRef = inject(DestroyRef);

  @Input()
  workerData!: WorkerData;

  @Output()
  editedWorkerDataEmitted: EventEmitter<WorkerData> = new EventEmitter();
  @Output()
  workerNotificationEmitted: EventEmitter<WorkerData> = new EventEmitter();
  @Output()
  deleteWorkerDataRequestEmitted: EventEmitter<WorkerData> = new EventEmitter();


  handleEditWorkerData() {
    const dialogRef = this.dialog.open(WorkerFormComponent, {
      disableClose: true,
      hasBackdrop: true,
      data : this.workerData
    });

    dialogRef.afterClosed()
      .pipe(
        takeUntilDestroyed(this.destroyRef),
        filter((data) => data),
        tap(data => this.editedWorkerDataEmitted.emit(data))
      )
      .subscribe(data => console.log(data))
  };

  handleNotifyWorker() {
    if (!this.workerData) {
      return;
    }
    this.workerNotificationEmitted.emit(this.workerData);
  }

  handleDeleteWorkerData() {
    if (!this.workerData) {
      return;
    }

    this.deleteWorkerDataRequestEmitted.emit(this.workerData);
  }

}
