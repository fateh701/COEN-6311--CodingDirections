import { Component } from '@angular/core';
import {SharedService} from "../../shared.service";
import {ActivatedRoute, Router} from "@angular/router";


@Component({
  selector: 'app-view-hotels',
  templateUrl: './view-hotels.component.html',
  styleUrl: './view-hotels.component.css'
})
export class ViewHotelsComponent {
  selectedHotel: any = [];

  constructor(private route: ActivatedRoute, private service: SharedService, private router: Router) {
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

  editHotel(id: number) {
    this.router.navigate(['/hotels', id, 'edit']);
  }

  deleteHotel(id: number) {
    if (confirm("Are you sure you want to delete this Hotel?")) {
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
