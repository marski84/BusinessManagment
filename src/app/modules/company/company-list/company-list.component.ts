import { Component, inject, OnInit, Signal } from '@angular/core';
import { CompanyService } from '../company.service';
import { Observable } from 'rxjs';
import { CompanyDataInterface } from '../../../Shared/Company.interface';

@Component({
  selector: 'app-company-list',
  templateUrl: './company-list.component.html',
  styleUrl: './company-list.component.css',
})
export class CompanyListComponent implements OnInit {
  companyService = inject(CompanyService);
  companyListObs$: Observable<CompanyDataInterface[]> =
    this.companyService.getCompanyList();
  companySelectedSubject$ = this.companyService.companySelected$;

  ngOnInit(): void {}

  handleGetCompanyEmployees(companyData: CompanyDataInterface) {
    // if(!companyData) {
    //   return
    // }
    console.log('click');
    console.log(companyData);
    if (companyData) {
      this.companyService.companySelected$.next(companyData);
    }
  }
}
