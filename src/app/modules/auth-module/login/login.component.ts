import {Component, inject} from '@angular/core';
import {FormDataInterface} from "../auth-fom/FormData.interface";
import {AbstractAuthenticationComponent} from "../AbstractAuthenticationComponent";
import {LoginService} from "../login.service";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent implements AbstractAuthenticationComponent {

  loginService: LoginService = inject(LoginService);
  onFormSubmit(event: FormDataInterface) {
    console.log(event);
    this.loginService.handleSignIn(event)
  }


}
