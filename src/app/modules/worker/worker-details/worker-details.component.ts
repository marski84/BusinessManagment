import {ChangeDetectionStrategy, Component, inject, Input} from '@angular/core';
import {WorkerData} from "../../../Shared/WorkerData.interface";
import {Dialog} from "@angular/cdk/dialog";
import {WorkerFormComponent} from "../worker-form/worker-form.component";
import {MatDialog, MatDialogConfig} from "@angular/material/dialog";

@Component({
  selector: 'app-worker-details',
  templateUrl: './worker-details.component.html',
  styleUrl: './worker-details.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class WorkerDetailsComponent {
  private readonly dialog = inject(MatDialog);
  private readonly dialogConfig: MatDialogConfig = {
    disableClose: true,
    hasBackdrop: true
  }

  @Input()
  workerData!: WorkerData;


  handleEditWorkerData() {
    this.dialogConfig.data = this.workerData;
    const dialogRef = this.dialog.open(WorkerFormComponent, {
      ...this.dialogConfig
    }
    )

    dialogRef.afterClosed().subscribe(data => console.log(data))
  }

// {
//   "_id": "6585b4fa41009f7f38bb2a4a",
//   "name": "Adam",
//   "surname": "Goodman",
//   "companyId": "6585b4fa41009f7f38bb2a49"
// }
//

}
