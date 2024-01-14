import {Component, inject, Input} from '@angular/core';
import {CompanyDataInterface} from "../models/Company.interface";
import {CompanyService} from "../company.service";


@Component({
  selector: 'app-company-detail',
  templateUrl: './company-detail.component.html',
  styleUrl: './company-detail.component.css'
})
export class CompanyDetailComponent {
  @Input()
  companyData!: CompanyDataInterface;

  companyService = inject(CompanyService);


  getCompanyEmployees(companyId: string) {
    console.log(companyId)
    this.companyService.getWorkersList(companyId)
      .subscribe()

  }


}
