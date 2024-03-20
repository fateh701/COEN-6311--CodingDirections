import { Component } from '@angular/core';
import {SharedService} from "../shared.service";

@Component({
  selector: 'app-notifications',
  templateUrl: './notifications.component.html',
  styleUrl: './notifications.component.css'
})
export class NotificationsComponent {
  notifications: any[] = [];

  constructor(private service: SharedService) {
    this.getNotifications();
  }

  getNotifications = () => {
    this.service.getNotifications().subscribe(
      data => {
        // @ts-ignore
        this.notifications.push(data['message']);
        // @ts-ignore
        console.log("notification from websocket:",data['message']);
      },
      error => {
        console.log("from getNotifications:",error);
      },
    );
  }

}
