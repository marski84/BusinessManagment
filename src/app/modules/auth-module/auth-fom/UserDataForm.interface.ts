import {FormControl} from "@angular/forms";

export interface UserDataFormInterface {
  email: FormControl<string>
  password: FormControl<string>
}
