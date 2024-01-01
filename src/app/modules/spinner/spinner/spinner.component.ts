import {Component, inject} from '@angular/core';
import {MatProgressSpinnerModule} from "@angular/material/progress-spinner";
import {SpinnerService} from "../spinner.service";

@Component({
  selector: 'app-spinner',
  templateUrl: './spinner.component.html',
  styleUrl: './spinner.component.css'
})
export class SpinnerComponent {
  spinnerService= inject(SpinnerService);


}
