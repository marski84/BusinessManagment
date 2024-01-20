import {inject, Injectable} from "@angular/core";
import {FormDataInterface} from "./models/FormData.interface";
import {ApiResponseInterface} from "./models/ApiResponse.interface";
import {Observable} from "rxjs";
import {HttpClient} from "@angular/common/http";

@Injectable(
  // {providedIn: 'root'}
)
export class LoginServiceRepository {
  // httpClient: HttpClient = inject(HttpClient);



  // TODO: domena do env
  private readonly signInUrl: string = 'https://lobster-app-86syw.ondigitalocean.app/auth/signIn';
  private readonly singUpUrl: string = 'https://lobster-app-86syw.ondigitalocean.app/auth/signUp';
  private readonly userDataUrl: string ='https://lobster-app-86syw.ondigitalocean.app/auth/user';

  constructor(private httpClient: HttpClient) {
  }
  signIn(data: FormDataInterface): Observable<ApiResponseInterface> {
    return this.httpClient.post<ApiResponseInterface>(this.signInUrl, data)
  }

  signUp(data: FormDataInterface): Observable<ApiResponseInterface>  {
    return this.httpClient.post<ApiResponseInterface>(this.singUpUrl, data)
  }

  getUserData() {
    return this.httpClient.get<ApiResponseInterface>(this.userDataUrl)
  }

}
