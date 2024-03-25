import { Component } from '@angular/core';
import {SharedService} from "../shared.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-hotels',
  templateUrl: './hotels.component.html',
  styleUrl: './hotels.component.css'
})
export class HotelsComponent {
  hotelsList: any = [];
  filteredHotelsList: any = [];
  searchQuery: string = '';
  selectedHotel: any;
  showHotelForm: boolean = false;

  constructor(private router: Router, private service: SharedService) {
    this.getHotelsList();
  }

    navHotels() {
    this.router.navigate(['/hotels']);
  }
  addNewHotel() {
    this.router.navigate(['/hotels']);
    this.showHotelForm = true;
  }

  cancelAddNewHotel() {
    this.showHotelForm = false;
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
