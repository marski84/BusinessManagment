import {
  computed,
  DestroyRef,
  inject,
  Injectable,
  signal,
} from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { UserDataInterface } from './Shared/UserData.interface';
import {catchError, EMPTY, finalize, retry, tap, throwError} from 'rxjs';
import { Router } from '@angular/router';
import { SpinnerService } from './modules/spinner/spinner.service';
import {environment} from "../environments/environment";

interface ChecklistState {
  checklist: any;
  loaded: boolean;
}
@Injectable({
  providedIn: 'root',
})
export class StoreService {
  private readonly baseUrl= environment.apiBaseUrl
  private readonly http = inject(HttpClient);
  private readonly destroyRef$ = inject(DestroyRef);
  private readonly router = inject(Router);
  private readonly spinnerService = inject(SpinnerService);
  jwtToken = '';
  userData: UserDataInterface | null = null;

  private readonly userDataUrl: string = `${this.baseUrl}/auth/user`;

  // state
  state = signal<ChecklistState>({
    // @ts-ignore
    checklist: null,
    loaded: false,
  });
  // sources
  checkList$ = this.http.get<ChecklistState>('some url');

  checklist = computed(() => this.state().checklist);
  loaded = computed(() => this.state().loaded);

  constructor(
    // @Inject(ENV_VARIABLES_TOKEN) private readonly baseUrl
  ) {
    //   reducers
    // this.checkList$
    //   .pipe(takeUntilDestroyed())
    //   .subscribe((checklist) =>
    //     this.state.update((state) =>
    //       ({ ...state, checklist, loaded: true }))
    //   );
  }

  getUserData() {
    return this.http
      .get<UserDataInterface>(this.userDataUrl, {
        headers: {
          Authorization: `Bearer ${this.jwtToken}`,
        },
      })
      .pipe(
        takeUntilDestroyed(this.destroyRef$),
        tap(() => this.spinnerService.show()),
        retry(3),
        catchError((err: HttpErrorResponse) => {
          this.spinnerService.hide();
          return throwError(err);
        }),
        tap((data) => (this.userData = data)),
        tap(() => console.log(this.userData)),
        finalize(() => this.spinnerService.hide())
      );
  }

  logOutUser() {
    console.log('logout called');
    this.jwtToken = '';
    this.userData = null;
    this.router.navigate(['../']);
  }
}
