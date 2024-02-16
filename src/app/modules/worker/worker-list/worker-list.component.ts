import {ChangeDetectionStrategy, Component, EventEmitter, Input, Output} from '@angular/core';
import {WorkerData} from "../../../Shared/WorkerData.interface";


@Component({
  selector: 'app-worker-list',
  templateUrl: './worker-list.component.html',
  styleUrl: './worker-list.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class WorkerListComponent {
  @Input()
  workersData!: WorkerData[];

  @Output()
  editedWorkerDataEmitted = new EventEmitter<WorkerData>();
  @Output()
  workerNotificationEmitted = new EventEmitter<WorkerData>();
  handleEditWorkerData(workerData: WorkerData) {
    if (!workerData) {
      return;
    }
    this.editedWorkerDataEmitted.emit(workerData);
  }

  handleWorkerNotification(workerData: WorkerData) {
    console.log('workerlist')
    if (!workerData) {
      return;
    }
    this.workerNotificationEmitted.emit(workerData);
  }

}
