import { Component } from '@angular/core';
import {ActivatedRoute,Router} from "@angular/router";
import {SharedService} from "../../shared.service";
import { AuthenticationService } from '../../authentication/authentication.service';
// Import AuthService to get current user information
import { AuthService } from '../../auth.service';
@Component({
  selector: 'app-custom-bookings-confirmation',
  templateUrl: './custom-bookings-confirmation.component.html',
  styleUrl: './custom-bookings-confirmation.component.css'
})
export class CustomBookingsConfirmationComponent {
  selectedBooking: any = {};
  userinfo: any={};

  constructor(private route: ActivatedRoute,private router:Router, private service: SharedService, private authenticationService: AuthenticationService, private authService: AuthService) {
    this.getSelectedBooking();
    this.userinfo = this.authService.getUserINFO()?.username;
  }

  getUserID() {
    if (typeof localStorage === 'undefined' || localStorage === null || !localStorage.getItem('userData')!) {
    return;
    }
    //const userid: AuthResData = JSON.parse(localStorage.getItem('userData')!);
    const userInfo = JSON.parse(localStorage.getItem('userData')!);
    // @ts-ignore
    console.log("user id return while fetching user id for create booking:",userInfo.id);

    return userInfo.id;
  }

  getSelectedBooking = () => {
    //fetch and display the booking details
    const bookingId = this.route.snapshot.paramMap.get('id'); //packageid will be passed here from booking review component.ts
    this.service.getSelectedCustomTravelpackage(bookingId).subscribe(
      data => {
        this.selectedBooking = data;
        console.log("id:" + this.selectedBooking.id);
      },
      error => {
        console.log(error);
      },
    );
  }

  confirmBooking(): void {
      this.router.navigate(['/custom-bookings-payment',this.route.snapshot.paramMap.get('id')]);

    }

}
