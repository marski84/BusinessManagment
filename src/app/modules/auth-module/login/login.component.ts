import {Component, inject, ViewChild} from '@angular/core';
import {FormDataInterface} from "../models/FormData.interface";
import {AbstractAuthenticationComponent} from "../AbstractAuthenticationComponent";
import {LoginService} from "../login.service";
import {AuthFormComponent} from "../auth-fom/auth-form.component";
import {FormGroup} from "@angular/forms";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent extends AbstractAuthenticationComponent{

  @ViewChild('form', {static: true}) readonly authForm: AuthFormComponent | undefined

  override onFormSubmit(event: FormDataInterface) {
    console.log(event);
    this.loginService.handleSignIn(event)
  }

  setLoginData() {
    this.authForm?.userDataForm.controls.email.setValue('okok@ok.pl')
    this.authForm?.userDataForm.controls.password.setValue('okokok')
  }


}
