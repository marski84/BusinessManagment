import {HttpClient} from "@angular/common/http";
import {inject, Injectable} from "@angular/core";
import {FormDataInterface} from "./models/FormData.interface";
import {ApiResponseInterface} from "./models/ApiResponse.interface";
import {Observable, retry} from "rxjs";

@Injectable()
export class LoginServiceRepository {
  private readonly httpClient: HttpClient = inject(HttpClient);

  private readonly signInUrl: string = 'https://lobster-app-86syw.ondigitalocean.app/auth/signIn';
  private readonly singUpUrl: string = 'https://lobster-app-86syw.ondigitalocean.app/auth/signUp';
  private readonly userDataUrl: string ='https://lobster-app-86syw.ondigitalocean.app/auth/user';

  signIn(data: FormDataInterface): Observable<ApiResponseInterface> {
    return this.httpClient.post<ApiResponseInterface>(this.signInUrl, data)

  }

  signUp(data: FormDataInterface): Observable<ApiResponseInterface>  {
    return this.httpClient.post<ApiResponseInterface>(this.singUpUrl, data)

  }

  getUserData() {
    return this.httpClient.get<ApiResponseInterface>(this.userDataUrl).subscribe()
  }

}
