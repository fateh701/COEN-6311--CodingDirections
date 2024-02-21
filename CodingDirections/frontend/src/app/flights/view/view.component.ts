import { Component } from '@angular/core';
import { SharedService } from "../../shared.service";
import {ActivatedRoute} from "@angular/router";


@Component({
  selector: 'app-view',
  templateUrl: './view.component.html',
  styleUrl: './view.component.css'

})
export class ViewComponent {
  selectedFlight: any = [];

  constructor(private route: ActivatedRoute, private service: SharedService) {
    this.getSelectedFlight();
  }

  getSelectedFlight = () => {
    var flightId = this.route.snapshot.paramMap.get('id');
    this.service.getSelectedFlight(flightId).subscribe(
      data => {
        this.selectedFlight = data;
      },
      error => {
        console.log(error);
      },
    );
  }
}
