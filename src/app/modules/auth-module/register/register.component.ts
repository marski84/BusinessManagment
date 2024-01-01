import { Component } from '@angular/core';
import {AbstractAuthenticationComponent} from "../AbstractAuthenticationComponent";
import {FormDataInterface} from "../models/FormData.interface";

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent extends AbstractAuthenticationComponent{

  override onFormSubmit(event: FormDataInterface) {
    this.loginService.handleSignUp(event)
  }
}
