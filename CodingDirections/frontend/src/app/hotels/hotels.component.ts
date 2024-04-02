import { Component } from '@angular/core';
import {SharedService} from "../shared.service";

@Component({
  selector: 'app-hotels',
  templateUrl: './hotels.component.html',
  styleUrl: './hotels.component.css'
})
export class HotelsComponent {
  hotelsList: any = [];

  constructor(private service: SharedService) {
    this.getHotelsList();
  }

  getHotelsList = () => {
    this.service.getHotelsList().subscribe(
      data => {
        this.hotelsList = data;
      },
      error => {
        console.log(error);
      },
    );
  }
}
