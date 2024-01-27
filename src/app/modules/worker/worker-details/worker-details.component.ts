import {ChangeDetectionStrategy, Component, Input} from '@angular/core';
import {WorkerData} from "../../../Shared/WorkerData.interface";

@Component({
  selector: 'app-worker-details',
  templateUrl: './worker-details.component.html',
  styleUrl: './worker-details.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class WorkerDetailsComponent {
  @Input()
  workerData!: WorkerData;

// {
//   "_id": "6585b4fa41009f7f38bb2a4a",
//   "name": "Adam",
//   "surname": "Goodman",
//   "companyId": "6585b4fa41009f7f38bb2a49"
// }
//

}
