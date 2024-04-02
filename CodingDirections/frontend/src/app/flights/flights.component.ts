import { Component } from '@angular/core';
import { Router } from "@angular/router";
import {SharedService} from "../shared.service";

@Component({
  selector: 'app-flights',
  templateUrl: './flights.component.html',
  styleUrl: './flights.component.css'
})
export class FlightsComponent {
  flightsList: any = [];
  filteredFlightsList: any = [];
  searchQuery: string = '';
  selectedFlight: any;
  showFlightForm: boolean = false;

  constructor(private router: Router, private service: SharedService) {
    this.getFlightsList();
  }

  // addNewFlight() {
  //   this.router.navigate(['/flights']);
  // }

  navFlights() {
    this.router.navigate(['/flights']);
  }
  addNewFlight() {
    this.router.navigate(['/flights']);
    this.showFlightForm = true;
  }

  cancelAddNewFlight() {
    this.showFlightForm = false;
  }

  getFlightsList = () => {
    this.service.getFlightsList().subscribe(
      data => {
        this.flightsList = data;
        this.filteredFlightsList = data;
      },
      error => {
        console.log(error);
      },
    );
  }
  getFilteredFlightsList() {
    if (this.searchQuery.trim()==='') {
      this.filteredFlightsList = this.flightsList;  // If the search query is empty, then the filtered list will be the same as the original list
    } else {
      this.filteredFlightsList = this.flightsList.filter((packageItem: any) =>
          packageItem.name.toLowerCase().includes(this.searchQuery.toLowerCase())
      );
    }
    }
}
