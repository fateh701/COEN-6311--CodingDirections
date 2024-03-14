import { Injectable } from "@angular/core";
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { singupModel,AuthResData,loginModel,User } from "./authentication.model";
import { Router } from "@angular/router";
import { catchError,tap} from 'rxjs/operators';
import { BehaviorSubject, throwError } from "rxjs";

@Injectable({providedIn: 'root'})
export class AuthenticationService{
  //user = new BehaviorSubject<User>();
  user = new BehaviorSubject<User | null>(null);

  constructor(private http: HttpClient, private router: Router) {
  }
  signup(account: singupModel){
    return this.http.post<AuthResData>('http://127.0.0.1:8000/create-user/signup/',account).pipe(
      catchError(this.handleError),
      tap(resData => {
        console.log(resData);
      })
    );
  }

  login(account: loginModel){
    return this.http.post<AuthResData>('http://127.0.0.1:8000/create-user/login/',account).pipe(
      catchError(this.handleError),
      tap(resData => {
        this.handleAuthentication(resData);
        console.log(resData);
      })
    );
  }

  private handleAuthentication(resData: AuthResData){
    const user = new User(resData.user_id,resData.email,resData.username,resData.first_name,resData.last_name,resData.token);
    this.user.next(user);
    localStorage.setItem('userData',JSON.stringify(user));  //this will store the user data in the local storage,so no need to login every  time
  }


  logout(){
    this.user.next(null);
    localStorage.removeItem('userData');
    this.router.navigate(['/']);  //this will navigate the user to the home page after logging out
  }

  autoLogin(){
    if (typeof localStorage === 'undefined' || localStorage === null || !localStorage.getItem('userData')){
      return;
    }
    else{
      //localStorage['userData']
      const userData:AuthResData = JSON.parse(localStorage.getItem('userData')!);
      const loadedUser = new User(userData.user_id,userData.email,userData.username,userData.first_name,userData.last_name,userData.token);
      this.user.next(loadedUser);
      return;
    }
  }

  private handleError(error: HttpErrorResponse){
    let errormessage = 'An unknown error occurred!';
    if(!error.error || !error.error.error){
      return throwError(errormessage);
    }
    if(error.error.non_field_errors){
      errormessage = error.error.non_field_errors[0]
    }
    if(error.error.email){
      errormessage = error.error.email[0]
    }
    if(error.error.username){
      errormessage = error.error.username[0]
    }
    return throwError(errormessage);
  }


}
