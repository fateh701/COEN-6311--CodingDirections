import { Component, OnDestroy } from '@angular/core';
import { SharedService } from "../../shared.service";
import { ActivatedRoute, Router } from "@angular/router";
import { Subscription } from 'rxjs';
import {AuthenticationService} from "../../authentication/authentication.service";

@Component({
  selector: 'app-view-hotels',
  templateUrl: './view-hotels.component.html',
  styleUrl: './view-hotels.component.css'
})
export class ViewHotelsComponent implements OnDestroy {
  selectedHotel: any = [];
  routeParamsSubscription: Subscription;
  userRole: string | undefined;

  constructor(private route: ActivatedRoute, private service: SharedService, private router: Router, private authService: AuthenticationService) {
    this.routeParamsSubscription = this.route.paramMap.subscribe(params => {
      this.getSelectedHotel();
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
