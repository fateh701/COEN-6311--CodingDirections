// import { Component } from '@angular/core';
// import { SharedService } from "../../shared.service";
// import {ActivatedRoute} from "@angular/router";
//
//
// @Component({
//   selector: 'app-view',
//   templateUrl: './view.component.html',
//   styleUrl: './view.component.css'
//
// })
// export class ViewComponent {
//   selectedFlight: any = [];
//
//   constructor(private route: ActivatedRoute, private service: SharedService) {
//     this.getSelectedFlight();
//   }
//
//   getSelectedFlight = () => {
//     var flightId = this.route.snapshot.paramMap.get('id');
//     this.service.getSelectedFlight(flightId).subscribe(
//       data => {
//         this.selectedFlight = data;
//       },
//       error => {
//         console.log(error);
//       },
//     );
//   }
// }

import { Component } from '@angular/core';
import { SharedService } from "../../shared.service";
import { ActivatedRoute, Router } from "@angular/router";

@Component({
  selector: 'app-view',
  templateUrl: './view.component.html',
  styleUrls: ['./view.component.css']
})
export class ViewComponent {
  selectedFlight: any = [];

  constructor(private route: ActivatedRoute, private service: SharedService, private router: Router) {
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

  editFlight(id: number) {
    this.router.navigate(['/flights', id, 'edit']);
  }

  deleteFlight(id: number) {
    if (confirm("Are you sure you want to delete this flight?")) {
      this.service.deleteFlight(id).subscribe(
        () => {
          // Optionally, you can redirect the user to another page after deletion
          this.router.navigate(['/flights']);
        },
        error => {
          console.log(error);
        }
      );
    }
  }
}
