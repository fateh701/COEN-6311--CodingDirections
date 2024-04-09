import { Component, OnDestroy } from '@angular/core';
import { SharedService } from "../../shared.service";
import { ActivatedRoute, Router } from "@angular/router";
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-view',
  templateUrl: './view.component.html',
  styleUrls: ['./view.component.css']
})
export class ViewComponent implements OnDestroy {
  selectedFlight: any = [];
  routeParamsSubscription: Subscription;

  constructor(private route: ActivatedRoute, private service: SharedService, private router: Router) {
    this.routeParamsSubscription = this.route.paramMap.subscribe(params => {
      this.getSelectedFlight();
    });
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
