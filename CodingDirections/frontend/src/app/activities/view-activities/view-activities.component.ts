import {Component, OnDestroy} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {SharedService} from "../../shared.service";
import { Subscription } from 'rxjs';
import {AuthenticationService} from "../../authentication/authentication.service";

@Component({
  selector: 'app-view-activities',
  templateUrl: './view-activities.component.html',
  styleUrl: './view-activities.component.css'
})
export class ViewActivitiesComponent implements OnDestroy {
  selectedActivity: any = [];
  routeParamsSubscription: Subscription;
  userRole: string | undefined;

  constructor(private route: ActivatedRoute, private service: SharedService, private router: Router, private authService: AuthenticationService) {
    this.routeParamsSubscription = this.route.paramMap.subscribe(params => {
      this.getSelectedActivity();
    });
    this.authService.user.subscribe(user => {
      this.userRole = user?.user_type;
      // console.log('User Role:', this.userRole);
    });
  }

  isAdmin(): boolean {
    return this.userRole === 'Admin';
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
