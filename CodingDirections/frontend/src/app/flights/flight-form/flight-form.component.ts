import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { SharedService } from "../../shared.service";

@Component({
  selector: 'app-flight-form',
  templateUrl: './flight-form.component.html',
  styleUrls: ['./flight-form.component.css']
})
export class FlightFormComponent implements OnInit {
  flight: any = {};
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
      this.service.getSelectedFlight(id).subscribe(data => {
        this.flight = data;
      });
    }
  }

  onSubmit() {
    if (this.editing) {
      this.service.editFlight(this.flight.id, this.flight).subscribe(() => {
        console.log("edited!")
        location.reload();

      });
    } else {
      this.service.addFlight(this.flight).subscribe(() => {
        console.log("added!")
        location.reload();
      });
    }
  }

  reloadPage() {
    location.reload();
  }
}
