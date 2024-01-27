import {CanActivateFn, Router, UrlTree} from '@angular/router';
import {inject} from "@angular/core";
import {StoreService} from "../../store.service";
import {of} from "rxjs";

//
export const isLoggedGuard: CanActivateFn = () => {
  const storeService = inject(StoreService);
  const router = inject(Router)

  console.log('canActivate guard')
  if (storeService.jwtToken) {
    return of(true)
  }
  return of(router.parseUrl('/')); };
