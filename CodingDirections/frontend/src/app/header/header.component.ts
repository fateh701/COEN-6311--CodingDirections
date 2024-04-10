import { Component,OnDestroy,PLATFORM_ID, Inject } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { Subscription } from 'rxjs';
import { AuthenticationService } from '../authentication/authentication.service';
import { User } from "../authentication/authentication.model";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent implements OnDestroy{
  user: User | null = null;
  isAuthenticated:boolean = false;
  private userSub: Subscription;
  socket: WebSocket | undefined;
  notifications: any[] = [];
  notificationsCount: number = 0;
  newNotificationMessage: string = ''; // Added for the new notification message input field
  sendToAgents: boolean = false;
  sendToUsers: boolean = false;
  userRole: string | undefined;

  constructor(@Inject(PLATFORM_ID) private platformId: Object,private authenticationService: AuthenticationService) {
    // WebSocket connection Error Patch -Pujan 9/4/2024
    /*
    The error message "WebSocket is not defined" indicates that the WebSocket object is not available in your Angular environment.
    This is because the WebSocket API is a browser API and is not available in Node.js or during server-side rendering (SSR),
    which is what Angular Universal uses.
    To resolve this issue, you need to ensure that your Angular application is running in a browser environment where the WebSocket API is available.
     You can conditionally instantiate the WebSocket only in the browser environment using Angular's platform detection capabilities.
     For example, you can use the isPlatformBrowser function from @angular/common:
     */
    if (isPlatformBrowser(this.platformId)) {
      this.socket = new WebSocket('ws://localhost:8000/ws/notify/');
      // On WebSocket connection open
      this.socket.onopen = (event) => {
        console.log('WebSocket connected.');
      };
      this.socket.onmessage = (event) => {
        const data = JSON.parse(event.data);

        // Handling the received message
        if (data['message'] != null) {
          try {
            this.notifications.push(data['message']);
            console.log('Notification received from Websocket and pushed:', data.message);
            this.notificationsCount++;
          } catch (e) {
            console.error('hError while pushing notification:', e);
          }
        } else {
          console.error('Invalid notification,is null or may be empty:', data);
        }
      };
      // On WebSocket error
      this.socket.onerror = (error) => {
        console.error('WebSocket error:', error);
      };

      // On WebSocket connection close
      this.socket.onclose = (event) => {
        console.log('WebSocket connection closed.');
      };
    }
    this.userSub = this.authenticationService.user.subscribe((user: any) => {
      this.isAuthenticated =!user? false: true;
      this.userRole = user?.user_type;
      this.user = user;
      // console.log('User Role:', this.userRole);
    } );
    //this.authenticationService.autoLogin()
  }

  sendNotification(message: string) {
    if (isPlatformBrowser(this.platformId)) {
      const notification = {
        message: message,
        send_to_agents: this.sendToAgents, // Adjust this according to your logic
        send_to_users: this.sendToUsers   // Adjust this according to your logic
      };
      console.log('Sending notification:', notification);
      this.socket?.send(JSON.stringify(notification));
    }
  }

  // Method to handle sending a new notification from the input field
  sendNewNotification() {
    if (this.newNotificationMessage.trim() !== '') {
      this.sendNotification(this.newNotificationMessage);
      this.newNotificationMessage = ''; // Clear the input field after sending the notification
    }
  }

  ngOnDestroy(){
    this.userSub.unsubscribe();
  }

  isAdmin(): boolean {
    return this.userRole === 'Admin';
  }

  isAgent(): boolean {
    return this.userRole === 'Agent' || this.userRole === 'Admin';
  }

  //This function will be used to log the user out upon clicking the logout button
  onLogout(){
    this.authenticationService.logout();
  }

}
