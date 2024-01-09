import {inject, Injectable} from '@angular/core';
import {StoreService} from "../../store.service";
import {HttpClient} from "@angular/common/http";
import {retry} from "rxjs";

@Injectable()
export class CompanyService {
  private readonly storeService = inject(StoreService);
  private readonly http = inject(HttpClient)

  private readonly companyListUrl =
    'https://lobster-app-86syw.ondigitalocean.app/companies';

  constructor() { }

  getCompanyList() {
    return this.http.get(this.companyListUrl, {
      headers: {
        Authorization: `Bearer ${this.storeService.jwtToken}`
      }
    }
    ).pipe(retry(3))
  }
}
