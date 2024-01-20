import {Component, inject, OnInit, Signal} from '@angular/core';
import {CompanyService} from "../company.service";
import {toSignal} from "@angular/core/rxjs-interop";
import {Observable} from "rxjs";
import {CompanyDataInterface} from "../models/Company.interface";

@Component({
  selector: 'app-company-list',
  templateUrl: './company-list.component.html',
  styleUrl: './company-list.component.css'
})
export class CompanyListComponent implements OnInit{
  companyListObs$: Observable<CompanyDataInterface[]> = inject(CompanyService).getCompanyList();


  ngOnInit(): void {
  }

}
