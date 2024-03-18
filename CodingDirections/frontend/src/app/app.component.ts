import { Component,OnInit } from '@angular/core';
import { AuthenticationService } from './authentication/authentication.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'

})
export class AppComponent implements OnInit{
  title = 'frontend';
  constructor(private authenticationService: AuthenticationService, private router: Router) {
    //this.authenticationService.autoLogin();
  }

  ngOnInit(){
    this.authenticationService.autoLogin();
  }
}
