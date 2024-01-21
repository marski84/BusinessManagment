import {inject, Injectable} from "@angular/core";
import {FormDataInterface} from "./models/FormData.interface";
import {ApiResponseInterface} from "./models/ApiResponse.interface";
import {Observable} from "rxjs";
import {HttpClient} from "@angular/common/http";
import {environment} from "../../../environments/environment";

@Injectable(
  // {providedIn: 'root'}
)
export class LoginServiceRepository {
  // httpClient: HttpClient = inject(HttpClient);


  private readonly baseUrl = environment.apiBaseUrl;
  // TODO: domena do env
  private readonly signInUrl: string = `${this.baseUrl}/auth/signIn`;
  private readonly singUpUrl: string = `${this.baseUrl}/auth/signUp`;
  private readonly userDataUrl: string =`${this.baseUrl}/auth/user`;

  constructor(private httpClient: HttpClient) {
    console.log(this.baseUrl)
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
