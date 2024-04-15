import {Component, OnInit} from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { SharedService } from "../../shared.service";

@Component({
  selector: 'app-hotel-form',
  templateUrl: './hotel-form.component.html',
  styleUrl: './hotel-form.component.css'
})
export class HotelFormComponent implements OnInit {
  hotel: any = {};
  editing: boolean = false;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private service: SharedService
  ) {}

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.editing = true;
      this.service.getSelectedHotel(id).subscribe(data => {
        this.hotel = data;
      });
    }
  }

  onSubmit() {
    if (this.editing) {
      this.service.editHotel(this.hotel.id, this.hotel).subscribe(() => {
        console.log("edited!");
        location.reload();
      });
    } else {
      this.service.addHotel(this.hotel).subscribe(() => {
        console.log("added!");
        location.reload();
      });
    }
  }

  reloadPage() {
    location.reload();
  }
}
