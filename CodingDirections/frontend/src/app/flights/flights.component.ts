import { Component } from '@angular/core';
import {SharedService} from "../shared.service";

@Component({
  selector: 'app-flights',
  templateUrl: './flights.component.html',
  styleUrl: './flights.component.css'
})
export class FlightsComponent {
  flightsList: any = [];

  constructor(private service: SharedService) {
    this.getFlightsList();
  }

  // Get all flights list,incase in future if we need so.. PAtch by Pujan 20/2/24
  getFlightsList = () => {
    this.service.getFlightsList().subscribe(
      data => {
        this.flightsList = data;
      },
      error => {
        console.log(error);
      },
    );
  }

}
