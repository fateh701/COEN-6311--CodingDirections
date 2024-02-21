import { Component } from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {SharedService} from "../../shared.service";

@Component({
  selector: 'app-view-activities',
  templateUrl: './view-activities.component.html',
  styleUrl: './view-activities.component.css'
})
export class ViewActivitiesComponent {
  selectedActivity: any = [];

  constructor(private route: ActivatedRoute, private service: SharedService) {
    this.getSelectedActivity();
  }

  getSelectedActivity = () => {
    var flightId = this.route.snapshot.paramMap.get('id');
    this.service.getSelectedActivity(flightId).subscribe(
      data => {
        this.selectedActivity = data;
      },
      error => {
        console.log(error);
      },
    );
  }

}
