import { Component } from '@angular/core';
import {ActivatedRoute,Router} from "@angular/router";
import {SharedService} from "../../shared.service";
import { AuthenticationService } from '../../authentication/authentication.service';
// Import AuthService to get current user information
import { AuthService } from '../../auth.service';
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
      const userID = this.getUserID();
      //console.log("Userid from user info dict:", userID);
      if (userID === undefined || userID === null || userID === '' || userID === 0 || isNaN(userID)) {
        console.log("userID not found in local storage,trace the confirmBooking function");
      } else {
        console.log("Userid from user info dict:", userID);
        // @ts-ignore
        this.service.postConfirmBooking(this.selectedBooking.id, userID).subscribe(
          response => {
            //Handle successful booking confirmation
            console.log("Booking confirmed")
            this.router.navigate(['/bookings']);
          },
          error => {
            console.log("Error confirming booking:", error);
          },
        )
      }
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


// @Component({
//   selector: 'app-booking-details',
//   templateUrl: './booking-details.component.html',
//   styleUrls: ['./booking-details.component.css']
// })
// export class BookingDetailsComponent {
//   bookingDetails: any;
//   Confirmation = false;
//
//   constructor(private apiService: ApiService) {}
//
//   showConfirmationDialog() {
//     this.Confirmation = true;
//   }
//
//   deleteBooking() {
//     this.apiService.deleteBooking(bookingId).subscribe(
//       () => {
//         console.log('Booking deleted');
//       },
//       (error) => {
//         console.error('Error:', error);
//       }
//     );
//   }
//   cancelDelete() {
//     this.Confirmation = false;
//   }
// }

