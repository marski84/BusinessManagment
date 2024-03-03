import {Component, inject, OnInit} from '@angular/core';
import {ActivatedRoute, Data} from "@angular/router";
import {filter, finalize, Observable, Subscription, switchMap, tap} from "rxjs";
import {UserDataInterface} from "../../../Shared/UserData.interface";
import {takeUntilDestroyed, toSignal} from '@angular/core/rxjs-interop';
import {CompanyDataInterface} from "../../../Shared/Company.interface";
import {PanelService} from "../panel.service";
import {WorkerData} from "../../../Shared/WorkerData.interface";
import {MatDialog} from "@angular/material/dialog";
import {WorkerFormComponent} from "../../worker/worker-form/worker-form.component";
import {PopupComponent} from "../../shared-standalone/popup/popup.component";


@Component({
  selector: 'app-panel',
  templateUrl: './panel.component.html',
  styleUrl: './panel.component.css'
})
export class PanelComponent implements OnInit {
  activatedRoute = inject(ActivatedRoute);
  userData: Observable<Data> = this.activatedRoute.data;
  panelService = inject(PanelService);
  data = toSignal(this.userData);
  private readonly dialog = inject(MatDialog);
  companySelected = false;


  constructor() {
  }

  ngOnInit(): void {
  }

  handleGetSelectedCompanyWorkers(companyData: CompanyDataInterface) {
    if (!companyData) {
      return
    }
    this.panelService.getWorkersList(companyData)
      .pipe(
        tap(() => this.companySelected = true),
        // tap(() => this.selectedCompanyId = companyData._id)
  )
      .subscribe();
  }

  handleWorkerEditedData(workerData: WorkerData) {
    if (!workerData) {
      return;
    }
    this.panelService.updateWorkerData(workerData).subscribe();
  }

  handleWorkerNotification(workerData: WorkerData) {
    if (!workerData) {
      return;
    }
    // handle situation when worker has no university data
    if (workerData.university === '') {
      this.handleWorkerDataSupplement(workerData);
      return;
    }
    // handle
    this.panelService.notifyWorker(workerData);
  }

  private handleWorkerDataSupplement(workerData: WorkerData) {
    const dialogRef = this.dialog.open(PopupComponent, {
      disableClose: true,
      hasBackdrop: true,
      data : {
        formData: workerData,
        editAllMode: false
      }
    });

    dialogRef.afterClosed()
      .pipe(
        // filter((res) => Boolean(res)),
        filter(Boolean),
        tap(editedWorkerData => this.panelService.updateWorkerData(editedWorkerData).subscribe()),
        tap(() => console.log('update')),
        switchMap(workerData => this.panelService.getWorkersList(this.panelService.currentCompany),
      )
      )
      .subscribe()
  }





}
