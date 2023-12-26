import {HttpClient} from "@angular/common/http";
import {inject, Injectable} from "@angular/core";

@Injectable(
//   {
//   providedIn: 'root'
// }
)
export class LoginServiceRepository {
  private readonly httpClient: HttpClient = inject(HttpClient);

  private readonly signInUrl: string = 'https://lobster-app-86syw.ondigitalocean.app/auth/signIn';
  private readonly singUpUrl: string = 'https://lobster-app-86syw.ondigitalocean.app:3000/auth/signUp';

  signIn() {
    return this.httpClient.post(this.signInUrl, {});
  }

  signUp() {
    return this.httpClient.post(this.singUpUrl, {});
  }

}
