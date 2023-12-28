import {HttpClient} from "@angular/common/http";
import {inject, Injectable} from "@angular/core";
import {FormDataInterface} from "./auth-fom/FormData.interface";

@Injectable()
export class LoginServiceRepository {
  private readonly httpClient: HttpClient = inject(HttpClient);

  private readonly signInUrl: string = 'https://lobster-app-86syw.ondigitalocean.app/auth/signIn';
  private readonly singUpUrl: string = 'https://lobster-app-86syw.ondigitalocean.app:3000/auth/signUp';

  signIn(data: FormDataInterface) {
    return this.httpClient.post(this.signInUrl, data);
  }

  signUp(data: FormDataInterface) {
    return this.httpClient.post(this.singUpUrl, data);
  }

}
