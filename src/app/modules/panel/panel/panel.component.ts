import {Component, inject, OnInit} from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {Observable, Subscription} from "rxjs";

@Component({
  selector: 'app-panel',
  templateUrl: './panel.component.html',
  styleUrl: './panel.component.css'
})
export class PanelComponent implements OnInit {
  activatedRoute = inject(ActivatedRoute)
  userData: Observable<{}> =  this.activatedRoute.data

  ngOnInit(): void {
  }


}
