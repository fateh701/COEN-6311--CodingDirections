import { Component, OnDestroy } from '@angular/core';
import { SharedService } from "../../shared.service";
import { ActivatedRoute, Router } from "@angular/router";
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-view-hotels',
  templateUrl: './view-hotels.component.html',
  styleUrl: './view-hotels.component.css'
})
export class ViewHotelsComponent implements OnDestroy {
  selectedHotel: any = [];
  routeParamsSubscription: Subscription;

  constructor(private route: ActivatedRoute, private service: SharedService, private router: Router) {
    this.routeParamsSubscription = this.route.paramMap.subscribe(params => {
      this.getSelectedHotel();
    });
  }

  ngOnDestroy(): void {
    this.routeParamsSubscription.unsubscribe(); // Unsubscribe to avoid memory leaks
  }

  getSelectedHotel = () => {
    var hotelId = this.route.snapshot.paramMap.get('id');
    this.service.getSelectedHotel(hotelId).subscribe(
      data => {
        this.selectedHotel = data;
      },
      error => {
        console.log(error);
      },
    );
  }

  deleteHotel(id: number) {
    if (confirm("Are you sure you want to delete this hotel?")) {
      this.service.deleteHotel(id).subscribe(
        () => {
          // Optionally, you can redirect the user to another page after deletion
          this.router.navigate(['/hotels']);
        },
        error => {
          console.log(error);
        }
      );
    }
  }
}
