import {Component, Input} from '@angular/core';
import {CompanyDataInterface} from "../models/Company.interface";


@Component({
  selector: 'app-company-detail',
  templateUrl: './company-detail.component.html',
  styleUrl: './company-detail.component.css'
})
export class CompanyDetailComponent {
  @Input()
  companyData!: CompanyDataInterface;



}
