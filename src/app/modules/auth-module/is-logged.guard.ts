import {CanActivateFn, Router} from '@angular/router';
import {inject} from "@angular/core";
import {StoreService} from "../../store.service";

export const isLoggedGuard: CanActivateFn = () => {
  const storeService = inject(StoreService);
  const router = inject(Router)

  console.log('canActivate guard')
  if (storeService.jwtToken) {
    return true
  }
  router.navigate(['../']).then(
    (result) => {
      if (!result) {
        console.log('nawigacja')
      }
    }
  )
  return false;
};
