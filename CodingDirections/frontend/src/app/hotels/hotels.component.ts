import { Component } from '@angular/core';
import {SharedService} from "../shared.service";
import {Router} from "@angular/router";
import { AuthenticationService } from '../authentication/authentication.service';

@Component({
  selector: 'app-hotels',
  templateUrl: './hotels.component.html',
  styleUrl: './hotels.component.css'
})
export class HotelsComponent {
  hotelsList: any = [];
  filteredHotelsList: any = [];
  searchQuery: string = '';
  showAddHotelButton: boolean = true;
  isAdmin: boolean = false;

  constructor(private router: Router, private service: SharedService, private authService: AuthenticationService) {
    this.getHotelsList();
    this.authService.user.subscribe(user => {
      this.isAdmin = user?.user_type === 'Admin'; // Check if user is admin
    });
  }

  ngOnInit(): void {
    // Check if the current URL is /hotels
    if (this.router.url === '/hotels') {
      this.showAddHotelButton = false;
    } else {
      this.showAddHotelButton = true;
    }
  }

  navHotels() {
    this.router.navigate(['/hotels']);
  }

  getHotelsList = () => {
    this.service.getHotelsList().subscribe(
      data => {
        this.hotelsList = data;
        this.filteredHotelsList = data;
      },
      error => {
        console.log(error);
      },
    );
  }
  getFilteredHotelsList() {
    if (this.searchQuery.trim()==='') {
      this.filteredHotelsList = this.hotelsList;  // If the search query is empty, then the filtered list will be the same as the original list
    } else {
      this.filteredHotelsList = this.hotelsList.filter((packageItem: any) =>
          packageItem.name.toLowerCase().includes(this.searchQuery.toLowerCase())
      );
    }
    }
}
