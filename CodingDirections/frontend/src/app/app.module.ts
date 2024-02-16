import { NgModule } from '@angular/core';
import { BrowserModule, provideClientHydration } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FlightsComponent } from './flights/flights.component';
import { HotelsComponent } from './hotels/hotels.component';
import { ActivitiesComponent } from './activities/activities.component';
import { TravelpackagesComponent } from './travelpackages/travelpackages.component';
import { ViewComponent } from './flights/view/view.component';

@NgModule({
  declarations: [
    AppComponent,
    FlightsComponent,
    HotelsComponent,
    ActivitiesComponent,
    TravelpackagesComponent,
    ViewComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [
    provideClientHydration()
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
