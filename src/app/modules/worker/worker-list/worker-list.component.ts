import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  OnChanges,
  OnInit,
  Output,
  SimpleChanges
} from '@angular/core';
import {WorkerData} from "../../../Shared/WorkerData.interface";



@Component({
  selector: 'app-worker-list',
  templateUrl: './worker-list.component.html',
  styleUrl: './worker-list.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class WorkerListComponent implements OnInit, OnChanges {
  @Input()
  workersData!: WorkerData[];

  @Output()
  editedWorkerDataEmitted = new EventEmitter<WorkerData>();
  @Output()
  workerNotificationEmitted = new EventEmitter<WorkerData>();

  companySelected = false;


  ngOnInit(): void {
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (!changes['workersData'].firstChange ) {
      this.companySelected = true;
    }
  }
  handleEditWorkerData(workerData: WorkerData) {
    if (!workerData) {
      return;
    }
    this.editedWorkerDataEmitted.emit(workerData);
  }

  handleWorkerNotification(workerData: WorkerData) {
    if (!workerData) {
      return;
    }
    this.workerNotificationEmitted.emit(workerData);
  }





}
