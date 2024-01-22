import {Component, inject, ViewChild} from '@angular/core';
import {FormDataInterface} from "../models/FormData.interface";
import {AbstractAuthenticationComponent} from "../AbstractAuthenticationComponent";
import {AuthFormComponent} from "../auth-fom/auth-form.component";
import { LoginService } from '../login.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent implements AbstractAuthenticationComponent {
    loginService: LoginService = inject(LoginService);

  @ViewChild('form', {static: true}) readonly authForm: AuthFormComponent | undefined

   onFormSubmit(event: FormDataInterface) {
    this.loginService.handleSignIn(event)
  }


  setLoginData() {
    this.authForm?.userDataForm.controls.email.setValue('okok@ok.pl')
    this.authForm?.userDataForm.controls.password.setValue('okokok')
  }


}
