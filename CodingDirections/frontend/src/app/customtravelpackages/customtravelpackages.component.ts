import { Component } from '@angular/core';
import {SharedService} from "../shared.service";
import {AuthenticationService} from "../authentication/authentication.service";

@Component({
  selector: 'app-customtravelpackages',
  templateUrl: './customtravelpackages.component.html',
  styleUrl: './customtravelpackages.component.css'
})
export class CustomTravelpackagesComponent {
  customtravelPackagesList: any = [];
  filteredCustomTravelPackagesList: any = [];  // This is the list that will be used to store the searched query Custom travel packages
  searchQuery: string = '';  // This is the variable that will be used to store the search query
  userRole: string | undefined;


  constructor(private service: SharedService, private authService: AuthenticationService) {
    this.getCustomTravelpackagesList();
    this.authService.user.subscribe(user => {
      this.userRole = user?.user_type;
      // console.log('User Role:', this.userRole);
    });
  }

  isAdmin(): boolean {
    return this.userRole === 'Admin';
  }

  getCustomTravelpackagesList = () => {
    this.service.getCustomTravelpackagesList().subscribe(
      data => {
        this.customtravelPackagesList = data;
        this.filteredCustomTravelPackagesList = data;  // Initially the filtered list will be the same as the original list
      },
      error => {
        console.log(error);
      },
    );
  }

  // This function will be used to filter the Custom travel packages list based on the search query entered by the user -Patch by Pujan 20/2/2024
  getFilteredCustomTravelpackagesList() {
    if (this.searchQuery.trim()==='') {
      this.filteredCustomTravelPackagesList = this.customtravelPackagesList;  // If the search query is empty, then the filtered list will be the same as the original list
    } else {
      this.filteredCustomTravelPackagesList = this.customtravelPackagesList.filter((packageItem: any) =>
          packageItem.name.toLowerCase().includes(this.searchQuery.toLowerCase())
      );
    }
    }

    deleteCustomTravelPackage(id: number): void {
    if (confirm("Are you sure you want to delete this Custom Travel Package?")) {
      this.service.deleteCustomTravelPackage(id).subscribe(
        () => {
          this.getCustomTravelpackagesList(); // Refresh the list after deletion
        },
        error => {
          console.log(error);
        }
      );
    }
  }
}
