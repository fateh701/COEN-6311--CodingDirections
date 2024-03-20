import { Component } from '@angular/core';
import {ActivatedRoute,Router} from "@angular/router";
import {SharedService} from "../../shared.service";
import {AuthResData} from "../../authentication/authentication.model";

@Component({
  selector: 'app-bookings-all',
  templateUrl: './bookings-all.component.html',
  styleUrl: './bookings-all.component.css'
})
export class BookingsAllComponent {
  allbookingsbyID: any[] = [];
  selectedBooking: any = {};

  constructor(private route: ActivatedRoute,private router:Router, private service: SharedService) {
    this.fetchBookingsByUserID();
  }

   getUserID() {
    if (typeof localStorage === 'undefined' || localStorage === null || !localStorage.getItem('userData')!) {
    return;
    }
    //const userid: AuthResData = JSON.parse(localStorage.getItem('userData')!);
    const userInfo = JSON.parse(localStorage.getItem('userData')!);
    // @ts-ignore
    console.log("user id return while fetching all its booking:",userInfo.id);

    return userInfo.id;
  }
  fetchBookingsByUserID = () => {
    const userID = this.getUserID();
    if (userID === undefined || userID === null || userID === '' || userID === 0 || isNaN(userID)) {
      console.log("userID not found in local storage,trace the fetchBookingsByUserID function");
    }
    else {
      //get all bookings by user id
      this.service.getAllBookingsByID(+this.getUserID()).subscribe(
        (data: any[]) => {
          this.allbookingsbyID = data;
        },
        (error: any) => {
          console.log(error);
        }
      )
    }
  }

  selectBooking(booking: any) {
    this.selectedBooking = booking;
  }

}