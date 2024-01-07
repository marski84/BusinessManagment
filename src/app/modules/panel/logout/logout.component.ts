import {Component, inject} from '@angular/core';
import {StoreService} from "../../../store.service";

@Component({
  selector: 'app-logout',
  templateUrl: './logout.component.html',
  styleUrl: './logout.component.css'
})
export class LogoutComponent {
  private readonly storeService = inject(StoreService);

  handleLogout() {
    this.storeService.logOutUser();
  }

}
