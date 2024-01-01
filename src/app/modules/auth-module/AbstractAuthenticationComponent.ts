import {FormDataInterface} from "./models/FormData.interface";
import {LoginService} from "./login.service";
import {inject} from "@angular/core";

export class AbstractAuthenticationComponent {
  loginService: LoginService = inject(LoginService);


  onFormSubmit(event: FormDataInterface) {
  }


}
