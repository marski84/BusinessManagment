import {ChangeDetectionStrategy, Component, EventEmitter, inject, Input, Output} from '@angular/core';
import {CompanyDataInterface} from "../../../Shared/Company.interface";
import {CompanyService} from "../company.service";


@Component({
  selector: 'app-company-detail',
  templateUrl: './company-detail.component.html',
  styleUrl: './company-detail.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CompanyDetailComponent {
  @Input()
  companyData!: CompanyDataInterface;

  @Output()
  companyEmployeesEmitted: EventEmitter<CompanyDataInterface> = new EventEmitter<CompanyDataInterface>

  companyService = inject(CompanyService);


  getCompanyEmployees(companyData: CompanyDataInterface) {
    if(!companyData) {
      return
    };
    this.companyEmployeesEmitted.emit(companyData);
  }


}
