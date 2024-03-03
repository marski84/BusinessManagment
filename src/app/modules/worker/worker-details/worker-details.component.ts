import {
  ChangeDetectionStrategy,
  Component,
  DestroyRef,
  EventEmitter,
  inject,
  Input,
  Output, ViewChild,
} from '@angular/core';
import { WorkerData } from '../../../Shared/WorkerData.interface';
import { WorkerFormComponent } from '../worker-form/worker-form.component';
import { MatDialog } from '@angular/material/dialog';
import { filter, tap } from 'rxjs';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import {PopupComponent} from "../../shared-standalone/./popup/popup.component";

@Component({
  selector: 'app-worker-details',
  templateUrl: './worker-details.component.html',
  styleUrl: './worker-details.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
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

  @ViewChild('formContainer', {static: false}) formContainer!: PopupComponent;
  handleEditWorkerData() {
    // this.formContainer.handleOpenForm()

    const dialogRef = this.dialog.open(PopupComponent, {
      disableClose: true,
      hasBackdrop: true,
      data: {
        formData: this.workerData,
        editAllMode: true,
      },
    });

    dialogRef
      .afterClosed()
      .pipe(
        takeUntilDestroyed(this.destroyRef),
        filter((data) => data),
        tap((data) => this.editedWorkerDataEmitted.emit(data))
      )
      .subscribe();
  }

  handleNotifyWorker() {
    if (!this.workerData) {
      return;
    }
    this.workerNotificationEmitted.emit(this.workerData);
  }
}
