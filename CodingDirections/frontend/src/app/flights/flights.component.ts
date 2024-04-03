import { Component } from '@angular/core';
import { Router } from "@angular/router";
import {SharedService} from "../shared.service";
import { AuthenticationService } from '../authentication/authentication.service';
// import { AuthenticationComponent } from '../authentication/authentication.component';


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
  isAdmin: boolean = false;

  constructor(private router: Router, private service: SharedService, private authService: AuthenticationService)  {//, private authComponent: AuthenticationComponent) {
    this.getFlightsList();
    this.authService.user.subscribe(user => {
      this.isAdmin = user?.user_type === 'Admin'; // Check if user is admin
      console.log('Is Admin:', this.isAdmin);
    });
  }

  navFlights() {
    this.router.navigate(['/flights']);
  }
  addNewFlight() {
    if (!this.isAdmin) {
      // Optionally, you can display a message or handle the action for non-admin users
      console.log(this.isAdmin);
      alert("Only admins can add new flights.");
      return;
    }
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
