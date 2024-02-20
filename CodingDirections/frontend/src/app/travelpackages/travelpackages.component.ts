import { Component } from '@angular/core';
import {SharedService} from "../shared.service";

@Component({
  selector: 'app-travelpackages',
  templateUrl: './travelpackages.component.html',
  styleUrl: './travelpackages.component.css'
})
export class TravelpackagesComponent {
  travelPackagesList: any = [];

  constructor(private service: SharedService) {
    this.getTravelpackagesList();
  }

  getTravelpackagesList = () => {
    this.service.getTravelpackagesList().subscribe(
      data => {
        this.travelPackagesList = data;
      },
      error => {
        console.log(error);
      },
    );
  }
}
