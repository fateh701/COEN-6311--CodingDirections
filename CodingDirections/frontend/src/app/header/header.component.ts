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
  userRole: string | undefined;

  constructor(private authenticationService: AuthenticationService) {
    this.userSub = this.authenticationService.user.subscribe((user: any) => {
      this.isAuthenticated =!user? false: true;
      this.userRole = user?.user_type;
      // console.log('User Role:', this.userRole);
    } );
    //this.authenticationService.autoLogin()
  }

  ngOnDestroy(){
    this.userSub.unsubscribe();
  }

  isAdmin(): boolean {
    return this.userRole === 'Admin';
  }

  isAgent(): boolean {
    return this.userRole === 'Agent' || this.userRole === 'Admin';
  }

  //This function will be used to log the user out upon clicking the logout button
  onLogout(){
    this.authenticationService.logout();
  }

}
