import { ResolveFn } from '@angular/router';
import {LoginService} from "./login.service";
import {inject} from "@angular/core";
import {Observable, retry, tap} from "rxjs";
import {AuthResponseInterface} from "./models/AuthResponse.interface";
import {HttpClient} from "@angular/common/http";
import {StoreService} from "../../store.service";
import {UserDataInterface} from "../../Shared/UserData.interface";

export const userDataResolver: () => Observable<UserDataInterface> =
  (): Observable<UserDataInterface> => {
  const storeService = inject(StoreService);

  return storeService.getUserData()
};
