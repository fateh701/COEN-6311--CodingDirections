import { Injectable } from "@angular/core";
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { singupModel,AuthResData,loginModel,User } from "./authentication.model";
import { Router } from "@angular/router";
import { catchError,tap} from 'rxjs/operators';
import { BehaviorSubject, throwError } from "rxjs";

@Injectable({providedIn: 'root'})
export class AuthenticationService{
  //user = new BehaviorSubject<User>();

  // constructor(private http: HttpClient,private router: Router){} {}

}
