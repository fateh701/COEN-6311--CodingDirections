import { Component } from '@angular/core';
import {ActivatedRoute,Router} from "@angular/router";
import {SharedService} from "../../shared.service";
import {AuthResData} from "../../authentication/authentication.model";

@Component({
  selector: 'app-bookings-review',
  templateUrl: './bookings-review.component.html',
  styleUrl: './bookings-review.component.css'
})
export class BookingsReviewComponent {
  selectedBooking: any = {};
  allbookingsbyID: any[] = [];

  constructor(private route: ActivatedRoute,private router:Router, private service: SharedService) {
    this.getSelectedBooking();
    this.fetchBookingsByUserID();
  }

  getSelectedBooking = () => {    //get package detail for particular package id only
    const packageId = this.route.snapshot.paramMap.get('id');
    this.service.getSelectedTravelpackage(packageId).subscribe(
      data => {
        this.selectedBooking = data;
      },
      error => {
        console.log(error);
      }
    )
  }

  bookNow=(packageItem: any)=>{
    //book the selected travelpackage
    this.router.navigate(['/bookings-confirmation', packageItem.id]);
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

    //get all bookings by user id
    this.service.getAllBookingsByID(this.getUserID()).subscribe(
        (data: any[]) => {
        this.allbookingsbyID = data;
      },
        (error: any) => {
        console.log(error);
      }
    )
  }

  selectBooking(booking: any) {
    this.selectedBooking = booking;
  }

}
