import {Component, inject} from '@angular/core';
import {CompanyService} from "../company.service";
import {toSignal} from "@angular/core/rxjs-interop";

@Component({
  selector: 'app-company-list',
  templateUrl: './company-list.component.html',
  styleUrl: './company-list.component.css'
})
export class CompanyListComponent {
  companyService = inject(CompanyService);

  companyData =this.companyService.getCompanyList()

}
