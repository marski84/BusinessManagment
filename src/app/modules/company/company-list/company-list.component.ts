import {Component, inject, OnInit, Signal} from '@angular/core';
import {CompanyService} from "../company.service";
import {Observable} from "rxjs";
import {CompanyDataInterface} from "../../../Shared/Company.interface";

@Component({
  selector: 'app-company-list',
  templateUrl: './company-list.component.html',
  styleUrl: './company-list.component.css'
})
export class CompanyListComponent implements OnInit{
  companyListObs$: Observable<CompanyDataInterface[]> = inject(CompanyService).getCompanyList();
  companySelectedSubject$  = inject(CompanyService).companySelected$;


  ngOnInit(): void {
  }

  handleGetCompanyEmployees(companyData: CompanyDataInterface) {
    if(!companyData) {
      return
    }
    this.companySelectedSubject$.next(companyData);
  }

}
