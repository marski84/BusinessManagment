import {ChangeDetectionStrategy, Component, Input} from '@angular/core';
import {LogoutComponent} from "../logout/logout.component";
import {UserDataInterface} from "../../../Shared/UserData.interface";

@Component({
  selector: 'app-panel-header',
  templateUrl: './panel-header.component.html',
  styleUrl: './panel-header.component.css',
  // changeDetection: ChangeDetectionStrategy.OnPush
})
export class PanelHeaderComponent {
  @Input()
  userData!: UserDataInterface

}
