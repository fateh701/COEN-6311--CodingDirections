import { NgModule } from '@angular/core';
import { BrowserModule, provideClientHydration } from '@angular/platform-browser';

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

import { HttpClientModule,provideHttpClient,withFetch } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {getSharedCompilationState} from "@angular-devkit/build-angular/src/tools/esbuild/angular/compilation-state";
import { BookingsComponent } from './bookings/bookings.component';
import { BookingsReviewComponent } from './bookings/bookings-review/bookings-review.component';
import { BookingsConfirmationComponent } from './bookings/bookings-confirmation/bookings-confirmation.component';

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
    BookingsConfirmationComponent, //This is the component that will be used to display the details of the selected travel package
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  providers: [
    SharedService, //This is the service that will be used to make the HTTP requests to the server
    provideClientHydration(),
    provideHttpClient(withFetch()),
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
