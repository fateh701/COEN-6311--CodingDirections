import { Component } from '@angular/core';
import { Router } from "@angular/router";
import {SharedService} from "../shared.service";

@Component({
  selector: 'app-activities',
  templateUrl: './activities.component.html',
  styleUrl: './activities.component.css'
})
export class ActivitiesComponent {
  activitiesList: any = [];
  filteredActivitiesList: any = [];  // This is the list that will be used to store the searched query
  searchQuery: string = '';  // This is the variable that will be used to store the search query
  selectedActivity: any;
  showActivityForm: boolean = false;

  constructor(private router: Router, private service: SharedService) {
    this.getActivitiesList();
  }
  navActivities() {
    this.router.navigate(['/activities']);
  }
  addNewActivity() {
    this.router.navigate(['/activities']);
    this.showActivityForm = true;
  }

  cancelAddNewActivity() {
    this.showActivityForm = false;
  }

  // Get all Activity list,incase in future if we need so.. PAtch by Pujan 20/2/24
  getActivitiesList = () => {
    this.service.getActivitiesList().subscribe(
      data => {
        this.activitiesList = data;
        this.filteredActivitiesList = data;
      },
      error => {
        console.log(error);
      },
    );
  }
  getFilteredActivitiesList() {
    if (this.searchQuery.trim()==='') {
      this.filteredActivitiesList = this.activitiesList;  // If the search query is empty, then the filtered list will be the same as the original list
    } else {
      this.filteredActivitiesList = this.activitiesList.filter((packageItem: any) =>
          packageItem.name.toLowerCase().includes(this.searchQuery.toLowerCase())
      );
    }
    }

}
