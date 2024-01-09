import {Component, inject, OnInit} from '@angular/core';
import {ActivatedRoute, Data} from "@angular/router";
import {Observable, Subscription} from "rxjs";
import {UserDataInterface} from "../../../Shared/UserData.interface";
import { toSignal } from '@angular/core/rxjs-interop';


@Component({
  selector: 'app-panel',
  templateUrl: './panel.component.html',
  styleUrl: './panel.component.css'
})
export class PanelComponent implements OnInit {
  activatedRoute = inject(ActivatedRoute)
  userData: Observable<Data> = this.activatedRoute.data;
  data = toSignal(this.userData);


  ngOnInit(): void {
  }


}
