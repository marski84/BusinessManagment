import {ChangeDetectionStrategy, Component, inject, Input} from '@angular/core';
import {WorkerData} from "../../../Shared/WorkerData.interface";
import {Dialog} from "@angular/cdk/dialog";
import {WorkerFormComponent} from "../worker-form/worker-form.component";

@Component({
  selector: 'app-worker-details',
  templateUrl: './worker-details.component.html',
  styleUrl: './worker-details.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class WorkerDetailsComponent {
  readonly dialog = inject(Dialog);

  @Input()
  workerData!: WorkerData;

  handleEditWorkerData() {
    this.dialog.open(WorkerFormComponent, {
      data: this.workerData
    }
    )
  }

// {
//   "_id": "6585b4fa41009f7f38bb2a4a",
//   "name": "Adam",
//   "surname": "Goodman",
//   "companyId": "6585b4fa41009f7f38bb2a49"
// }
//

}
