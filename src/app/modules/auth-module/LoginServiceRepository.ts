import {inject, Injectable} from "@angular/core";
import {FormDataInterface} from "./models/FormData.interface";
import {AuthResponseInterface} from "./models/AuthResponse.interface";
import {Observable} from "rxjs";
import {HttpClient} from "@angular/common/http";
import {environment} from "../../../environments/environment";

@Injectable(
  // {providedIn: 'root'}
)
export class LoginServiceRepository {
  httpClient: HttpClient = inject(HttpClient);


  private readonly baseUrl = environment.apiBaseUrl;
  private readonly signInUrl: string = `${this.baseUrl}/auth/signIn`;
  private readonly singUpUrl: string = `${this.baseUrl}/auth/signUp`;

  constructor() {
  }
  signIn(data: FormDataInterface): Observable<AuthResponseInterface> {
    return this.httpClient.post<AuthResponseInterface>(this.signInUrl, data)
  }

  signUp(data: FormDataInterface): Observable<AuthResponseInterface>  {
    return this.httpClient.post<AuthResponseInterface>(this.singUpUrl, data)
  }

}
