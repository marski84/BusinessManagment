import {Component, Input} from '@angular/core';
import {UserDataInterface} from "../../../Shared/UserData.interface";

@Component({
  selector: 'app-user-info',
  templateUrl: './user-info.component.html',
  styleUrl: './user-info.component.css'
})
export class UserInfoComponent {
  @Input()
  userData!: UserDataInterface

}
