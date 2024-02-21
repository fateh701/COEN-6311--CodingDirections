import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FlightsComponent } from "./flights/flights.component";
import { TravelpackagesComponent } from "./travelpackages/travelpackages.component";
import { HotelsComponent } from "./hotels/hotels.component";
import { ActivitiesComponent } from "./activities/activities.component";
import { ViewTravelPackagesComponent } from "./travelpackages/view-travel-packages/view-travel-packages.component";


const routes: Routes = [ {path : 'flights', component : FlightsComponent},
                         {path:'flights/:id', component:FlightsComponent},
                         {path : 'travelpackages', component : TravelpackagesComponent},
                         {path : 'travelpackages/:id', component : ViewTravelPackagesComponent},
                         {path : 'hotels', component : HotelsComponent},
                         {path:'hotels/:id', component:HotelsComponent},
                         {path : 'activities', component : ActivitiesComponent},
                         {path:'activities/:id', component:ActivitiesComponent},
        ];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
