import {Component, EventEmitter, inject, Output} from '@angular/core';
import { FormGroup, NonNullableFormBuilder, Validators} from "@angular/forms";
import {UserDataFormInterface} from "../models/UserDataForm.interface";

@Component({
  selector: 'app-auth-form',
  templateUrl: './auth-form.component.html',
  styleUrl: './auth-form.component.css'
})
export class AuthFormComponent {
  @Output() onSubmitEmitted:EventEmitter<{ email: string, password: string }> = new EventEmitter();
  fb = inject(NonNullableFormBuilder);

  userDataForm: FormGroup<UserDataFormInterface> = this.fb.group({
    email:['',[ Validators.required, Validators.email]],
    password: ['', Validators.required]
  })

  handleSubmit() {
    if (!this.userDataForm.valid) {
      return;
    }
    this.onSubmitEmitted.emit(this.userDataForm.getRawValue());
  }

}
