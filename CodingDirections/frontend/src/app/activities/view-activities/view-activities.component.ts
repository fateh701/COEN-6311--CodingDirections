import {Component, OnDestroy} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {SharedService} from "../../shared.service";
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-view-activities',
  templateUrl: './view-activities.component.html',
  styleUrl: './view-activities.component.css'
})
export class ViewActivitiesComponent implements OnDestroy {
  selectedActivity: any = [];
  routeParamsSubscription: Subscription;

  constructor(private route: ActivatedRoute, private service: SharedService, private router: Router) {
    this.routeParamsSubscription = this.route.paramMap.subscribe(params => {
      this.getSelectedActivity();
    });
  }

  ngOnDestroy(): void {
    this.routeParamsSubscription.unsubscribe(); // Unsubscribe to avoid memory leaks
  }

  getSelectedActivity = () => {
    var activityId = this.route.snapshot.paramMap.get('id');
    this.service.getSelectedActivity(activityId).subscribe(
      data => {
        this.selectedActivity = data;
      },
      error => {
        console.log(error);
      },
    );
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
