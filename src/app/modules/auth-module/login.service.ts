import {inject, Injectable} from '@angular/core';
import {LoginServiceRepository} from "./LoginServiceRepository";

@Injectable(
//   {
//   providedIn: 'root'
// }
)
export class LoginService {
  urlRepository: LoginServiceRepository = inject(LoginServiceRepository);

  constructor() { }

  handleSignIn(user: any) {
  this.urlRepository.signIn().subscribe()
  }
}
