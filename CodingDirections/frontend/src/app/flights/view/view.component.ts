import { Component, OnDestroy } from '@angular/core';
import { SharedService } from "../../shared.service";
import { ActivatedRoute, Router } from "@angular/router";
import { Subscription } from 'rxjs';
import {AuthenticationService} from "../../authentication/authentication.service";

@Component({
  selector: 'app-view',
  templateUrl: './view.component.html',
  styleUrls: ['./view.component.css']
})
export class ViewComponent implements OnDestroy {
  selectedFlight: any = [];
  routeParamsSubscription: Subscription;
  userRole: string | undefined;

  constructor(private route: ActivatedRoute, private service: SharedService, private router: Router, private authService: AuthenticationService) {
    this.routeParamsSubscription = this.route.paramMap.subscribe(params => {
      this.getSelectedFlight();
    });
    this.authService.user.subscribe(user => {
      this.userRole = user?.user_type;
      // console.log('User Role:', this.userRole);
    });
  }

  isAdmin(): boolean {
    return this.userRole === 'Admin';
  }

  isAgent(): boolean {
    return this.userRole === 'Admin' || this.userRole === 'Agent';
  }

  ngOnDestroy(): void {
    this.routeParamsSubscription.unsubscribe(); // Unsubscribe to avoid memory leaks
  }

  getSelectedFlight = () => {
    var flightId = this.route.snapshot.paramMap.get('id');
    this.service.getSelectedFlight(flightId).subscribe(
      data => {
        this.selectedFlight = data;
      },
      error => {
        console.log(error);
      },
    );
  }

  deleteFlight(id: number) {
    if (confirm("Are you sure you want to delete this flight?")) {
      this.service.deleteFlight(id).subscribe(
        () => {
          // Optionally, you can redirect the user to another page after deletion
          this.router.navigate(['/flights']);
        },
        error => {
          console.log(error);
        }
      );
    }
  }
}
