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
  companyEmployeesEmitted: EventEmitter<string> = new EventEmitter<string>

  companyService = inject(CompanyService);


  getCompanyEmployees(companyId: string) {
    if(!companyId) {
      return
    };
    this.companyEmployeesEmitted.emit(companyId);
  }


}
