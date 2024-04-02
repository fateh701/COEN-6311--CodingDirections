import { Component } from '@angular/core';
import {SharedService} from "../shared.service";

@Component({
  selector: 'app-travelpackages',
  templateUrl: './travelpackages.component.html',
  styleUrl: './travelpackages.component.css'
})
export class TravelpackagesComponent {
  travelPackagesList: any = [];
  filteredTravelPackagesList: any = [];  // This is the list that will be used to store the searched query travel packages
  searchQuery: string = '';  // This is the variable that will be used to store the search query


  constructor(private service: SharedService) {
    this.getTravelpackagesList();
  }

  getTravelpackagesList = () => {
    this.service.getTravelpackagesList().subscribe(
      data => {
        this.travelPackagesList = data;
        this.filteredTravelPackagesList = data;  // Initially the filtered list will be the same as the original list
      },
      error => {
        console.log(error);
      },
    );
  }

  // This function will be used to filter the travel packages list based on the search query entered by the user -Patch by Pujan 20/2/2024
  getFilteredTravelpackagesList() {
    if (this.searchQuery.trim()==='') {
      this.filteredTravelPackagesList = this.travelPackagesList;  // If the search query is empty, then the filtered list will be the same as the original list
    } else {
      this.filteredTravelPackagesList = this.travelPackagesList.filter((packageItem: any) =>
          packageItem.name.toLowerCase().includes(this.searchQuery.toLowerCase())
      );
    }
    }
}
