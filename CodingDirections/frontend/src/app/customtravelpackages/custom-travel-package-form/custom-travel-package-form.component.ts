import {Component, OnInit} from '@angular/core';
import { ActivatedRoute, Router } from "@angular/router";
import { SharedService } from "../../shared.service";
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-custom-travel-package-form',
  templateUrl: './custom-travel-package-form.component.html',
  styleUrl: './custom-travel-package-form.component.css'
})
export class CustomTravelPackageFormComponent implements OnInit {
  name: string = ''; // Define name property
  selectedFlights: any[] = []; // Define selectedFlights property
  flightsList: any[] = []; // Define flightsList property
  selectedHotels: any[] = []; // Define selectedHotels property
  hotelsList: any[] = []; // Define hotelsList property
  selectedActivities: any[] = []; // Define selectedActivities property
  activitiesList: any[] = []; // Define activitiesList property
  price: number | null = null; // Define price property
  payload: any = {}; // Define payload property
  editing: boolean = false;
  customtravelPackageId: number | null = null;
  currentUser: any;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private service: SharedService,
    private http: HttpClient
  ) {}

  ngOnInit() {
    this.calculateTotalPrice();
    this.getCurrentUser();
    this.route.paramMap.subscribe(params => {
      this.getFlightsList(); // Fetch flights list
      this.getHotelsList(); // Fetch hotels list
      this.getActivitiesList(); // Fetch activities list
      const id = params.get('id');
      if (id) {
        this.editing = true;
        this.customtravelPackageId = +id;
        this.fetchCustomTravelPackageDetails(+id);
      }
    });
  }

  getCurrentUser() {
    if (typeof localStorage === 'undefined' || localStorage === null || !localStorage.getItem('userData')!) {
    return;
    }
    //const userid: AuthResData = JSON.parse(localStorage.getItem('userData')!);
    const userInfo = JSON.parse(localStorage.getItem('userData')!);
    // @ts-ignore
    console.log("current user info:",userInfo);
    this.currentUser = userInfo.id;
  }

  fetchCustomTravelPackageDetails(id: number) {
    // Make an HTTP request to fetch the details of the custom travel package with the given ID
    this.http.get<any>(`http://127.0.0.1:8000/custom-travel-packages/${id}`)
      .subscribe(
        response => {
          console.log('Custom Travel package details:', response);
          // Populate the form fields with the fetched data
          this.name = response.name;
          this.selectedFlights = response.flights;
          this.selectedHotels = response.hotels;
          this.selectedActivities = response.activities;
          this.price = response.price;
          // this.currentUser = response.created_by;
        },
        error => {
          console.error('Error fetching custom travel package details:', error);
          // Handle error, e.g., show an error message to the user
        }
      );
  }

  onSubmit() {
    const payload = {
      name: this.name,
      flights: this.selectedFlights,
      hotels: this.selectedHotels,
      activities: this.selectedActivities,
      price: this.calculateTotalPrice()
      // created_by: this.currentUser
    };
    console.log('Payload:', payload);
    if (this.editing && this.customtravelPackageId) {
      // If editing, make a PUT request to update the existing custom travel package
      this.http.put<any>(`http://127.0.0.1:8000/update-custom-travel-package/${this.customtravelPackageId}/`, payload)
        .subscribe(
          response => {
            console.log('Custom Travel package updated:', response);
            this.router.navigate(['/customtravelpackages']);
            // Handle success, e.g., show a success message to the user
          },
          error => {
            console.error('Error updating custom travel package:', error);
            // Handle error, e.g., show an error message to the user
          }
        );
    } else {
      // If not editing, make a POST request to create a new custom travel package
      this.http.post<any>('http://127.0.0.1:8000/create-custom-travel-package/', payload)
        .subscribe(
          response => {
            // console.log('Custom Travel package created:', response);
            location.reload();
            // Handle success, e.g., show a success message to the user
          },
          error => {
            console.error('Error creating custom travel package:', error);
            // Handle error, e.g., show an error message to the user
          }
        );
    }
  }

  calculateTotalPrice(): number {
    let totalPrice = 0;
    this.selectedFlights.forEach(flightId => {
      const flight = this.flightsList.find(f => f.id === flightId);
      if (flight) {
        totalPrice += Number(flight.price);
      }
    });
    this.selectedHotels.forEach(hotelId => {
      const hotel = this.hotelsList.find(f => f.id === hotelId);
      if (hotel) {
        totalPrice += Number(hotel.price_per_night);
      }
    });
    this.selectedActivities.forEach(activityId => {
      const activity = this.activitiesList.find(f => f.id === activityId);
      if (activity) {
        totalPrice += Number(activity.price);
      }
    });
    console.log('Total price:', totalPrice);
    return totalPrice;
  }

  getFlightsList = () => {
    this.service.getFlightsList().subscribe(
      data => {
        this.flightsList = data;
      },
      error => {
        console.log(error);
      },
    );
  }

  getActivitiesList = () => {
    this.service.getActivitiesList().subscribe(
      data => {
        this.activitiesList = data;
      },
      error => {
        console.log(error);
      },
    );
  }

  getHotelsList = () => {
    this.service.getHotelsList().subscribe(
      data => {
        this.hotelsList = data;
      },
      error => {
        console.log(error);
      },
    );
  }
}
