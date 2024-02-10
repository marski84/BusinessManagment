import {Component, inject, OnInit} from '@angular/core';
import {ActivatedRoute, Data} from "@angular/router";
import {Observable, Subscription} from "rxjs";
import {UserDataInterface} from "../../../Shared/UserData.interface";
import { toSignal } from '@angular/core/rxjs-interop';
import {CompanyDataInterface} from "../../../Shared/Company.interface";
import {PanelService} from "../panel.service";
import {WorkerData} from "../../../Shared/WorkerData.interface";


@Component({
  selector: 'app-panel',
  templateUrl: './panel.component.html',
  styleUrl: './panel.component.css'
})
export class PanelComponent implements OnInit {
  activatedRoute = inject(ActivatedRoute)
  userData: Observable<Data> = this.activatedRoute.data;
  panelService = inject(PanelService);
  data = toSignal(this.userData);

  workerDataObs$: Observable<any> | undefined;


  ngOnInit(): void {
  }

  handleCompanySelected(companyData: CompanyDataInterface) {
    console.log(companyData)
    if (!companyData) {
      return
    }
    this.panelService.getWorkersList(companyData).subscribe();
  }

  handleWorkerEditedData(workerData: WorkerData) {
    console.log(workerData)
    this.panelService.updateWorkerData(workerData);
  }


}
