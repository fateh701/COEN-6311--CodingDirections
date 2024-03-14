import { Component,OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { AuthenticationService } from '../authentication/authentication.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent implements OnDestroy{
  isAuthenticated:boolean = false;
  private userSub: Subscription;

  constructor(private authenticationService: AuthenticationService) {
    this.userSub = this.authenticationService.user.subscribe((user: any) => {
      this.isAuthenticated =!user? false: true;
    } );
    //this.authenticationService.autoLogin()
  }

  ngOnDestroy(){
    this.userSub.unsubscribe();
  }

  //This function will be used to log the user out upon clicking the logout button
  onLogout(){
    this.authenticationService.logout();
  }

}
