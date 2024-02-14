import { NgModule } from '@angular/core';
import { BrowserModule, provideClientHydration } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { TpdetailsComponent } from './tpdetails/tpdetails.component';
import { ViewComponent } from './tpdetails/view/view.component';
import { SharedService } from './shared.service';

import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {getSharedCompilationState} from "@angular-devkit/build-angular/src/tools/esbuild/angular/compilation-state";

@NgModule({
  declarations: [
    AppComponent,
    TpdetailsComponent,
    ViewComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [
    SharedService,
    provideClientHydration()
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
