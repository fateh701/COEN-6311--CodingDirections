import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class SharedService {
readonly APIUrl = "http://127.0.0.1:8000";

  constructor(private http:HttpClient) { }

  getTpList():Observable<any[]>{
    return this.http.get<any[]>(this.APIUrl + '/books/');
  }

  addTp(val:any){
    return this.http.post(this.APIUrl + '/books/create/',val);
  }

  getAllTp():Observable<any[]>{
    return this.http.get<any[]>(this.APIUrl + '/books/');
  }
}
// Path: tpdetails.component.ts
