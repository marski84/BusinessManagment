import {FormDataInterface} from "./models/FormData.interface";
import {LoginService} from "./login.service";
import {inject} from "@angular/core";

export abstract class AbstractAuthenticationComponent {
  abstract loginService: LoginService;


   onFormSubmit(event: FormDataInterface) {
  }

  // abstract onFormSubmit(event: FormDataInterface) {
  // }


}
