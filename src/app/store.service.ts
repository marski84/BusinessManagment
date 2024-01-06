import {computed, inject, Injectable, signal} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {takeUntilDestroyed} from "@angular/core/rxjs-interop";
import {LoginService} from "./modules/auth-module/login.service";


interface ChecklistState {
  checklist: any;
  loaded: boolean;
}
@Injectable({
  providedIn: 'root'
})
export class StoreService {
   http = inject(HttpClient);
   jwtToken = '';

  // state
  state = signal<ChecklistState>(
    {  // @ts-ignore
      checklist: null,
      loaded: false
    })
    // sources
    checkList$ = this.http.get<ChecklistState>('some url');

  checklist = computed(() => this.state().checklist);
  loaded = computed(() => this.state().loaded);

  constructor() {
    //   reducers
    this.checkList$
      .pipe(takeUntilDestroyed())
      .subscribe((checklist) =>
        this.state.update((state) =>
          ({ ...state, checklist, loaded: true }))
      );
  }

}
