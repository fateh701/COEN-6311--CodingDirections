import { Component } from '@angular/core';
import { Router } from "@angular/router";
import {SharedService} from "../shared.service";
import {AuthenticationService} from "../authentication/authentication.service";

@Component({
  selector: 'app-activities',
  templateUrl: './activities.component.html',
  styleUrl: './activities.component.css'
})
export class ActivitiesComponent {
  activitiesList: any = [];
  filteredActivitiesList: any = [];  // This is the list that will be used to store the searched query
  searchQuery: string = '';  // This is the variable that will be used to store the search query
  showAddActivityButton: boolean = true;
  userRole: string | undefined;

  constructor(private router: Router, private service: SharedService, private authService: AuthenticationService) {
    this.getActivitiesList();
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
    // Check if the current URL is /activities
    if (this.router.url === '/activities') {
      this.showAddActivityButton = false;
    } else {
      this.showAddActivityButton = true;
    }
  }
  navActivities() {
    this.router.navigate(['/activities']);
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
