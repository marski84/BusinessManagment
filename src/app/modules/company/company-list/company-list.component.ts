import {Component, EventEmitter, inject, OnInit, Output, Signal} from '@angular/core';
import { Observable } from 'rxjs';
import { CompanyDataInterface } from '../../../Shared/Company.interface';
import {PanelService} from "../../panel/panel.service";

@Component({
  selector: 'app-company-list',
  templateUrl: './company-list.component.html',
  styleUrl: './company-list.component.css',
})
export class CompanyListComponent implements OnInit {
  panelService: PanelService = inject(PanelService);

  @Output()
  selectedCompanyEmitted : EventEmitter<CompanyDataInterface> =
  new EventEmitter<CompanyDataInterface>();

  companyListObs$: Observable<CompanyDataInterface[]> = this.panelService.getCompanyList();

  ngOnInit(): void {}

  handleGetCompanyEmployees(companyData: CompanyDataInterface) {
    if(!companyData) {
      return
    }
    this.selectedCompanyEmitted.emit(companyData);
  }
}
