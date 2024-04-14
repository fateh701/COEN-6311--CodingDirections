import { NgModule } from '@angular/core';
import { BrowserModule, provideClientHydration } from '@angular/platform-browser';
import { MatCardModule } from '@angular/material/card';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FlightsComponent } from './flights/flights.component';
import { HotelsComponent } from './hotels/hotels.component';
import { ActivitiesComponent } from './activities/activities.component';
import { TravelpackagesComponent } from './travelpackages/travelpackages.component';
import { ViewComponent } from './flights/view/view.component';
import { ViewActivitiesComponent } from './activities/view-activities/view-activities.component';
import { ViewHotelsComponent } from './hotels/view-hotels/view-hotels.component';
import { ViewTravelPackagesComponent } from './travelpackages/view-travel-packages/view-travel-packages.component';

import { SharedService } from './shared.service';

import { HttpClientModule,provideHttpClient,withFetch,withInterceptors } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {getSharedCompilationState} from "@angular-devkit/build-angular/src/tools/esbuild/angular/compilation-state";
import { BookingsComponent } from './bookings/bookings.component';
import { BookingsReviewComponent } from './bookings/bookings-review/bookings-review.component';
import { BookingsConfirmationComponent } from './bookings/bookings-confirmation/bookings-confirmation.component';
import { BookingsPaymentComponent} from "./bookings/bookings-payment/bookings-payment.component";
//import { AuthenticationComponent } from './authentication/authentication.component';
import { AccountComponent } from './account/account.component';
import { HeaderComponent } from './header/header.component';
import {AuthenticationModule} from "./authentication/authentication.module";
import { tokenInterceptor } from "./token.interceptor";
import { BookingsAllComponent } from './bookings/bookings-all/bookings-all.component';
import { ReportsComponent } from './reports/reports.component';
import { FlightFormComponent } from './flights/flight-form/flight-form.component';
import { ActivityFormComponent } from './activities/activity-form/activity-form.component';
import { HotelFormComponent } from './hotels/hotel-form/hotel-form.component';
import { AccountmanagementComponent } from './accountmanagement/accountmanagement.component';
import {MatTable} from "@angular/material/table";
import { MatTableModule } from '@angular/material/table';
import { TravelPackageFormComponent } from './travelpackages/travel-package-form/travel-package-form.component';
import { CustomTravelpackagesComponent } from './customtravelpackages/customtravelpackages.component';
import { CustomTravelPackageFormComponent } from './customtravelpackages/custom-travel-package-form/custom-travel-package-form.component';
import { ViewCustomTravelPackagesComponent } from './customtravelpackages/view-custom-travel-packages/view-custom-travel-packages.component';
// @ts-ignore
@NgModule({
  declarations: [
    AppComponent,
    FlightsComponent,
    HotelsComponent,
    ActivitiesComponent,
    TravelpackagesComponent,
    ViewComponent,            //This is the component that will be used to display the details of the selected flight
    ViewActivitiesComponent,  //This is the component that will be used to display the details of the selected activity
    ViewHotelsComponent,      //This is the component that will be used to display the details of the selected hotel
    ViewTravelPackagesComponent,
    BookingsComponent,
    BookingsReviewComponent,
    BookingsConfirmationComponent,
    BookingsPaymentComponent,
    //AuthenticationComponent,
    AccountComponent,
    HeaderComponent,
    BookingsAllComponent,
    ReportsComponent,
    FlightFormComponent,
    ActivityFormComponent,
    HotelFormComponent,
    AccountmanagementComponent,
    TravelPackageFormComponent,
    CustomTravelpackagesComponent,
    CustomTravelPackageFormComponent,
    ViewCustomTravelPackagesComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    MatCardModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    AuthenticationModule,
    MatTable,
    MatTableModule,
  ],
  providers: [
    SharedService, //This is the service that will be used to make the HTTP requests to the server
    provideClientHydration(),
    provideHttpClient(withFetch(), withInterceptors([tokenInterceptor])),
  ],
  bootstrap: [AppComponent]
})

export class AppModule { }
