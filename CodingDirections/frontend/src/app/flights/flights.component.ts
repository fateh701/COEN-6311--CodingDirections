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
  showAddFlightButton: boolean = true;
  userRole: string | undefined;

  constructor(private router: Router, private service: SharedService, private authService: AuthenticationService)  {//, private authComponent: AuthenticationComponent) {
    this.getFlightsList();
    this.authService.user.subscribe(user => {
      this.userRole = user?.user_type;
      // console.log('User Role:', this.userRole);
    });
  }

  isAdmin(): boolean {
    return this.userRole === 'Admin';
  }

  isAgent(): boolean {
    return this.userRole === 'Agent' || this.userRole === 'Admin';
  }

  ngOnInit(): void {
    // Check if the current URL is /flights
    if (this.router.url === '/flights') {
      this.showAddFlightButton = false;
    } else {
      this.showAddFlightButton = true;
    }
  }

  navFlights() {
    this.router.navigate(['/flights']);
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
