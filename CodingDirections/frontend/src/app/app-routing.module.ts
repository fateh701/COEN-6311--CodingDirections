import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TpdetailsComponent } from './tpdetails/tpdetails.component';

const routes: Routes = [{path : 'tpdetails', component : TpdetailsComponent}];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
