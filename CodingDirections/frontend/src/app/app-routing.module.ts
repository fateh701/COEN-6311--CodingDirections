import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FlightsComponent } from "./flights/flights.component";
import { TravelpackagesComponent } from "./travelpackages/travelpackages.component";
import { CustomTravelpackagesComponent } from "./customtravelpackages/customtravelpackages.component";
import { HotelsComponent } from "./hotels/hotels.component";
import { HotelFormComponent } from './hotels/hotel-form/hotel-form.component';
import { ActivitiesComponent } from "./activities/activities.component";
import { ViewTravelPackagesComponent } from "./travelpackages/view-travel-packages/view-travel-packages.component";
import { ViewCustomTravelPackagesComponent } from "./customtravelpackages/view-custom-travel-packages/view-custom-travel-packages.component";
import { BookingsComponent} from "./bookings/bookings.component";
import { BookingsReviewComponent} from "./bookings/bookings-review/bookings-review.component";
import { BookingsPaymentComponent} from "./bookings/bookings-payment/bookings-payment.component";
import { BookingsConfirmationComponent} from "./bookings/bookings-confirmation/bookings-confirmation.component";
import { BookingsAllComponent } from "./bookings/bookings-all/bookings-all.component";
import { ReportsComponent} from "./reports/reports.component";

//Component of Authentication and Authorization
import { HeaderComponent } from "./header/header.component";
import { AccountComponent } from "./account/account.component";
import { AuthenticationComponent } from "./authentication/authentication.component";
import { FlightFormComponent } from './flights/flight-form/flight-form.component';
import {ActivityFormComponent} from "./activities/activity-form/activity-form.component";
import { AccountmanagementComponent } from "./accountmanagement/accountmanagement.component";


const routes: Routes = [ {path : 'flights', component : FlightsComponent},
                         {path:'flights/:id', component:FlightsComponent},
                         {path : 'travelpackages', component : TravelpackagesComponent},
                         {path : 'travelpackages/:id', component : ViewTravelPackagesComponent},
                         {path : 'customtravelpackages', component : CustomTravelpackagesComponent},
                         {path : 'customtravelpackages/:id', component : ViewCustomTravelPackagesComponent},
                         {path : 'hotels', component : HotelsComponent},
                         {path:'hotels/:id', component:HotelsComponent},
                         {path : 'activities', component : ActivitiesComponent},
                         {path:'activities/:id', component:ActivitiesComponent},
                         {path:'booking-review',component:BookingsReviewComponent},
                         {path:'booking-review/:id',component:BookingsReviewComponent},
                         {path:'bookings-confirmation',component:BookingsConfirmationComponent},
                         {path:'bookings-payment',component:BookingsPaymentComponent},
                         {path:'bookings-payment/:id',component:BookingsPaymentComponent},
                         {path:'bookings-confirmation/:id',component:BookingsConfirmationComponent},
                         {path:'profile',component:AccountComponent},
                         {path:'authentication',component:AuthenticationComponent},
                         {path:'bookings',component:BookingsAllComponent},
                         {path:'reports',component:ReportsComponent},
                         {path:'accountmanagement',component:AccountmanagementComponent},

        ];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
