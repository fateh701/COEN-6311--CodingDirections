import { Component } from '@angular/core';
import { SharedService } from "../../shared.service";


@Component({
  selector: 'app-view',
  templateUrl: './view.component.html',
  styleUrl: './view.component.css'

})
export class ViewComponent {
  flightsList: any = [];

  constructor(private service: SharedService) {
    this.getFlightsList();
  }

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
