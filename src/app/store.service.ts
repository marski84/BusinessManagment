import {computed, DestroyRef, inject, Injectable, signal} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {takeUntilDestroyed} from "@angular/core/rxjs-interop";
import {LoginService} from "./modules/auth-module/login.service";
import {UserDataInterface} from "./Shared/UserData.interface";
import {retry, tap} from "rxjs";
import {Router} from "@angular/router";


interface ChecklistState {
  checklist: any;
  loaded: boolean;
}
@Injectable({
  providedIn: 'root'
})
export class StoreService {
   private readonly http = inject(HttpClient);
   private readonly destroyRef$ =inject(DestroyRef);
   private readonly router = inject(Router);
   jwtToken = '';
   userData: UserDataInterface | null = null;
   private readonly userDataUrl: string ='https://lobster-app-86syw.ondigitalocean.app/auth/user';
   temp = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY1OGRjYzYwNDEwMDlmN2YzOGJiMmE0YyIsImlhdCI6MTcwNDU1NjIyOCwiZXhwIjoxNzA0NjQyNjI4fQ.wiS7aFmyOGASsWFn1x2gzKNhx9NhwFksfjiOukTpOeA\n'


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
    // this.checkList$
    //   .pipe(takeUntilDestroyed())
    //   .subscribe((checklist) =>
    //     this.state.update((state) =>
    //       ({ ...state, checklist, loaded: true }))
    //   );
  }

  getUserData() {
    return this.http.get<UserDataInterface>(this.userDataUrl,
      {
        headers: {
          Authorization: `Bearer ${this.temp}`
        }
      })
      .pipe(
        retry(3),
        tap((data) => this.userData = data),
        tap(() => console.log(this.userData)),
        takeUntilDestroyed(this.destroyRef$)
      )
  }

  logOutUser() {
    console.log('logout called')
    this.jwtToken = '';
    this.userData = null;
    this.router.navigate(['../']);
  }

}
