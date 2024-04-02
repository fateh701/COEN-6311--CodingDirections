import { Component } from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {SharedService} from "../../shared.service";

@Component({
  selector: 'app-view-activities',
  templateUrl: './view-activities.component.html',
  styleUrl: './view-activities.component.css'
})
export class ViewActivitiesComponent {
  selectedActivity: any = [];

  constructor(private route: ActivatedRoute, private service: SharedService, private router: Router) {
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

  editActivity(id: number) {
    this.router.navigate(['/activities', id, 'edit']);
  }

  deleteActivity(id: number) {
    if (confirm("Are you sure you want to delete this Activity?")) {
      this.service.deleteActivity(id).subscribe(
        () => {
          // Optionally, you can redirect the user to another page after deletion
          this.router.navigate(['/activities']);
        },
        error => {
          console.log(error);
        }
      );
    }
  }

}
