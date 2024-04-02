import { Component } from '@angular/core';
import { SharedService } from "../../shared.service";
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-view-travel-packages',
  templateUrl: './view-travel-packages.component.html',
  styleUrl: './view-travel-packages.component.css'
})
export class ViewTravelPackagesComponent {
  selectedPackage: any;
  constructor(private route: ActivatedRoute, private service: SharedService) {
    this.getSelectedPackage()
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
