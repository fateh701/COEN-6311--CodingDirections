import { Component } from '@angular/core';
import {SharedService} from "../../shared.service";

@Component({
  selector: 'app-view',
  templateUrl: './view.component.html',
  styleUrl: './view.component.css'
})
export class ViewComponent {
  constructor(private service:SharedService) {
  }

  TpdetailsList: any = [];

  ngOnInit(): void {
    this.refreshTpList();
  }

  refreshTpList() {
    this.service.getTpList().subscribe(data => {
      this.TpdetailsList = data;
    });
  }
}
