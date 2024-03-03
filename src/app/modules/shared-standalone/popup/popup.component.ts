import {Component, DestroyRef, Inject, inject, Input} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialog} from "@angular/material/dialog";
import {WorkerFormComponent} from "../../worker/worker-form/worker-form.component";
import {takeUntilDestroyed} from "@angular/core/rxjs-interop";
import {filter} from "rxjs";
import {WorkerModule} from "../../worker/worker.module";
import {WorkerData} from "../../../Shared/WorkerData.interface";
import {NgIf} from "@angular/common";

export interface WorkerDialogInterface {
  formData: WorkerData,
  editAllMode: boolean
}


@Component({
  selector: 'app-popup',
  standalone: true,
  imports: [
    WorkerFormComponent,
    NgIf,

  ],
  templateUrl: './popup.component.html',
  styleUrl: './popup.component.css'
})
export class PopupComponent {

  private readonly dialog = inject(MatDialog);
  private readonly destroyRef = inject(DestroyRef);
  workerData = this.data.formData;
  isEditable= this.data.editAllMode;

  constructor(@Inject(MAT_DIALOG_DATA) private data: WorkerDialogInterface) {
  }

  handleOpenForm() {
  //   console.log('handleOpenForm()')
  //   const dialogRef = this.dialog.open(WorkerFormComponent, {
  //     disableClose: true,
  //     hasBackdrop: true,
  //     data: {
  //       formData: this.data,
  //       editAllMode: true,
  //     },
  //   });
  //
  //   dialogRef
  //     .afterClosed()
  //     .pipe(
  //       takeUntilDestroyed(this.destroyRef),
  //       filter((data) => data),
  //       // tap((data) => this.editedWorkerDataEmitted.emit(data))
  //     )
  //     .subscribe();
  }

}
