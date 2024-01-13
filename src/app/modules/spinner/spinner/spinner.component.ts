import {Component, inject} from '@angular/core';
import {MatProgressSpinnerModule} from "@angular/material/progress-spinner";
import {SpinnerService} from "../spinner.service";
import {toSignal} from "@angular/core/rxjs-interop";

@Component({
  selector: 'app-spinner',
  templateUrl: './spinner.component.html',
  styleUrl: './spinner.component.css'
})
export class SpinnerComponent {
  isSpinnerActive$= inject(SpinnerService).isLoading$;



}
