import { Injectable } from '@angular/core';
import {BehaviorSubject} from "rxjs";

@Injectable()
export class SpinnerService {

  isLoading$ = new BehaviorSubject(false);
  private amountOfCalls = 0;

  constructor() {
  }

  show() {
    this.amountOfCalls++;
    this.isLoading$.next(true)
  }

  hide() {
    this.isLoading$.next(false)

    this.amountOfCalls--;
    if (this.amountOfCalls === 0) {
    }
  }

}
