import { Component } from '@angular/core';
import {SharedService} from "../../shared.service";
import {ActivatedRoute} from "@angular/router";


@Component({
  selector: 'app-view-hotels',
  templateUrl: './view-hotels.component.html',
  styleUrl: './view-hotels.component.css'
})
export class ViewHotelsComponent {
  selectedHotel: any = [];

  constructor(private route: ActivatedRoute, private service: SharedService) {
    this.getSelectedHotel();
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

}
