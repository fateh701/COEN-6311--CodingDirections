import {Component, Injectable} from '@angular/core';
import {SharedService} from "../shared.service";

@Injectable(
    {providedIn: 'root'}
)
@Component({
  selector: 'app-notifications',
  templateUrl: './notifications.component.html',
  styleUrl: './notifications.component.css'
})
export class NotificationsComponent {
  notifications: any[] = [];
  notificationsCount: number = 0;
  //isDropdownOpen: boolean = false; // Flag to control the visibility of the dropdown

  constructor(private service: SharedService) {
    this.getNotifications();
  }

  getNotifications = () => {
    this.service.getNotifications().subscribe(
      data => {
        // Increment count and push notification message
        this.notificationsCount++;
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

// export const notificationsCount = 0;
