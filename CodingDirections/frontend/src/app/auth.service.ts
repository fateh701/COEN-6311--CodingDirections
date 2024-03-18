import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import { Observable} from 'rxjs';
import {map} from 'rxjs/operators';
import {AuthResData} from "./authentication/authentication.model";

@Injectable({
  providedIn: 'root'
})

export class AuthService {
  //baseURL = 'http://127.0.0.1:8000/api-auth/login/';
  userToken: any;

  constructor(private http: HttpClient) { }
  getUserToken() {
    if (typeof localStorage === 'undefined' || localStorage === null || !localStorage.getItem('userData')) {
    return;
    }
    const token: AuthResData = JSON.parse(localStorage.getItem('userData')!);
    console.log("Token return from getUserToken method:",token.token)
    return token.token; //will return token of loggedin user
  }

  getUserINFO(){
    if (typeof localStorage === 'undefined' || localStorage === null || !localStorage.getItem('userData')) {
    return;
    }

    const userData: AuthResData = JSON.parse(localStorage.getItem('userData')!);
    return userData
  }
  getCurrentUser(): Observable<string> {
    return this.http.get<any>('http://127.0.0.1:8000/current-user-info/')
  }
  // login(username: string, password: string): Observable<any> {
  //   //return this.http.post<any>(this.baseURL, {username, password})
  // }




}
