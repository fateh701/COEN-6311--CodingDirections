import { Component } from '@angular/core';
import { SharedService } from "../../shared.service";
import { ActivatedRoute } from '@angular/router';
import {AuthenticationService} from "../../authentication/authentication.service";

@Component({
  selector: 'app-view-custom-travel-packages',
  templateUrl: './view-custom-travel-packages.component.html',
  styleUrl: './view-custom-travel-packages.component.css'
})
export class ViewCustomTravelPackagesComponent {
  selectedPackage: any;
  userRole: string | undefined;
  // createdBy: any;

  constructor(private route: ActivatedRoute, private service: SharedService, private authService: AuthenticationService) {
    this.getSelectedPackage();

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

  isUser(): boolean {
    return this.userRole === 'Agent' || this.userRole === 'Admin' || this.userRole === 'User';
  }

  getSelectedPackage() {
    //get package detail for particular package id only
    const packageId = this.route.snapshot.paramMap.get('id');
    this.service.getSelectedCustomTravelpackage(packageId).subscribe(
      data => {
        this.selectedPackage = data;
        // this.getUserDetails(this.selectedPackage.created_by);
      },
      error => {
        console.log(error);
      }
    )
  }

  // getUserDetails(userId: number) {
  //   this.service.getUserById(userId).subscribe(
  //     data => {
  //       console.log("user data is: ", data);
  //       this.createdBy = data;
  //     },
  //     error => {
  //       console.log(error);
  //     }
  //   );
  // }
}