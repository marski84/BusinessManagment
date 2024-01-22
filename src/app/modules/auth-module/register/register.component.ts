import {Component, inject} from '@angular/core';
import {AbstractAuthenticationComponent} from "../AbstractAuthenticationComponent";
import {FormDataInterface} from "../models/FormData.interface";
import {LoginService} from "../login.service";

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent implements AbstractAuthenticationComponent {
  loginService: LoginService = inject(LoginService);


  onFormSubmit(event: FormDataInterface) {
    this.loginService.handleSignUp(event)
  }

}
