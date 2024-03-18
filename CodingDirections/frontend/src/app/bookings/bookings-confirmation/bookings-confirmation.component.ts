import { Component } from '@angular/core';
import {ActivatedRoute,Router} from "@angular/router";
import {SharedService} from "../../shared.service";
import { AuthenticationService } from '../../authentication/authentication.service';
// Import AuthService to get current user information
import { AuthService } from '../../auth.service';
import {AuthResData} from "../../authentication/authentication.model";

@Component({
  selector: 'app-bookings-confirmation',
  templateUrl: './bookings-confirmation.component.html',
  styleUrl: './bookings-confirmation.component.css'
})
export class BookingsConfirmationComponent {
  selectedBooking: any = {};
  userinfo: any={};

  constructor(private route: ActivatedRoute,private router:Router, private service: SharedService, private authenticationService: AuthenticationService, private authService: AuthService) {
    this.getSelectedBooking();
    this.userinfo = this.authService.getUserINFO()?.username;

  }

  getSelectedBooking = () => {
    //fetch and display the booking details
    const bookingId = this.route.snapshot.paramMap.get('id'); //packageid will be passed here from booking review component.ts
    this.service.getSelectedTravelpackage(bookingId).subscribe(
      data => {
        this.selectedBooking = data;
        console.log("id:" + this.selectedBooking.id);
      },
      error => {
        console.log(error);
      },
    );
  }

    // console.log("Current user return string:",this.authService.getCurrentUser().subscribe(
    //   (response) => {
    //     this.userinfo = response;
    //     console.log("Current user:",this.userinfo);
    //   }
    //
    // ))

    confirmBooking(): void {
    //const userToken = this.authService.getUserINFO()?.token;
    const userDict = this.authService.getUserINFO();
    console.log("User info dict:",userDict);
    // @ts-ignore
    this.service.postConfirmBooking(this.selectedBooking.id).subscribe(
      response => {
        //Handle successful booking confirmation
        console.log("Booking confirmed")
        this.router.navigate(['/travelpackages']);
      },
      error => {
        console.log("Error confirming booking:",error);
      },
    )
  }



  // confirmBooking(): void {
  //
  //   this.service.postConfirmBooking(+this.selectedBooking.id).subscribe(
  //     response => {
  //       //Handle successful booking confirmation
  //       console.log("Booking confirmed")
  //       this.router.navigate(['/travelpackages']);
  //     },
  //     error => {
  //       console.log("Error confirming booking:",error);
  //     },
  //   )
  // }


}
