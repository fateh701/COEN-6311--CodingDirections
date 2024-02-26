import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import { Observable} from 'rxjs';
import {map} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})

export class AuthService {
  //baseURL = 'http://127.0.0.1:8000/api-auth/login/';
  userToken: any;

  constructor(private http: HttpClient) { }

  getCurrentUser(): Observable<string> {
    return this.http.get<any>('http://127.0.0.1:8000/current-user-info/')
  }
  // login(username: string, password: string): Observable<any> {
  //   //return this.http.post<any>(this.baseURL, {username, password})
  // }




}
