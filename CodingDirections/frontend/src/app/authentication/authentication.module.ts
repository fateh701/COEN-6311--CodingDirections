import { CommonModule } from '@angular/common';
import { BrowserModule} from "@angular/platform-browser";
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { AuthenticationComponent } from './authentication.component';
import { AuthenticationService } from './authentication.service';

@NgModule({
    declarations:[
        AuthenticationComponent
    ],
    imports: [
      BrowserModule,
        ReactiveFormsModule,
        CommonModule
    ],
    providers: [AuthenticationService],
    bootstrap: [AuthenticationComponent]
})
export class AuthenticationModule{}
