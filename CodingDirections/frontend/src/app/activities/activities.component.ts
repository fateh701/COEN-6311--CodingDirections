import { Component } from '@angular/core';
import {SharedService} from "../shared.service";

@Component({
  selector: 'app-activities',
  templateUrl: './activities.component.html',
  styleUrl: './activities.component.css'
})
export class ActivitiesComponent {
  activitiesList: any = [];

  constructor(private service: SharedService) {
    this.getActivitiesList();
  }

  // Get all flights list,incase in future if we need so.. PAtch by Pujan 20/2/24
  getActivitiesList = () => {
    this.service.getActivitiesList().subscribe(
      data => {
        this.activitiesList = data;
      },
      error => {
        console.log(error);
      },
    );
  }

}
