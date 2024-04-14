import { Component } from '@angular/core';
import { SharedService } from "../../shared.service";
import { ActivatedRoute } from '@angular/router';
import {AuthenticationService} from "../../authentication/authentication.service";

@Component({
  selector: 'app-view-travel-packages',
  templateUrl: './view-travel-packages.component.html',
  styleUrl: './view-travel-packages.component.css'
})
export class ViewTravelPackagesComponent {
  selectedPackage: any;
  userRole: string | undefined;
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
    return this.userRole === 'Admin' || this.userRole === 'Agent';
  }

  getSelectedPackage() {
    //get package detail for particular package id only
    const packageId = this.route.snapshot.paramMap.get('id');
    this.service.getSelectedTravelpackage(packageId).subscribe(
      data => {
        this.selectedPackage = data;
      },
      error => {
        console.log(error);
      }
    )
  }
}
