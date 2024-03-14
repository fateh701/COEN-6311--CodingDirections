import { Component } from '@angular/core';
import { AuthenticationService } from '../authentication/authentication.service';
import { Subscription} from "rxjs";
import { User } from "../authentication/authentication.model";

@Component({
  selector: 'app-account',
  templateUrl: './account.component.html',
  styleUrl: './account.component.css'
})
export class AccountComponent {
  user: User | null = null;
  private userSub: Subscription;
  constructor(private authenticationService: AuthenticationService) {
    this.userSub = this.authenticationService.user.subscribe((user: User | null) => {
      this.user = user;
    });
  }

  ngOnDestroy() {
    this.userSub.unsubscribe();
  }

}
