import { Component } from '@angular/core';
import {ActivatedRoute,Router} from "@angular/router";
import {SharedService} from "../../shared.service";

@Component({
  selector: 'app-bookings-review',
  templateUrl: './bookings-review.component.html',
  styleUrl: './bookings-review.component.css'
})
export class BookingsReviewComponent {
  selectedBooking: any = {};

  constructor(private route: ActivatedRoute,private router:Router, private service: SharedService) {
    this.getSelectedBooking();
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

}
