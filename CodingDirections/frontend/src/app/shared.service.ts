import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class SharedService {

  readonly baseAPIUrl = "http://127.0.0.1:8000";
  httpHeaders = new HttpHeaders({'Content-Type':'application/json'});

  constructor(private http:HttpClient) { }

  getFlightsList():Observable<any[]>{
    return this.http.get<any[]>(this.baseAPIUrl + '/flights/',{headers:this.httpHeaders});
  }

  addFlight(val:any){
    return this.http.post(this.baseAPIUrl + '/flights/',val,{headers:this.httpHeaders});
  }

  getSelectedFlight(id:any):Observable<any[]>{
    return this.http.get<any[]>(this.baseAPIUrl + '/flights/' + id + '/',{headers:this.httpHeaders});
  }



  getTravelpackagesList():Observable<any[]>{
    return this.http.get<any[]>(this.baseAPIUrl + '/travel-packages/',{headers:this.httpHeaders});
  }

  getSelectedTravelpackage(id:any):Observable<any[]>{
    return this.http.get<any[]>(this.baseAPIUrl + '/travel-packages/' + id + '/',{headers:this.httpHeaders});
  }

  getHotelsList():Observable<any[]>{
    return this.http.get<any[]>(this.baseAPIUrl + '/hotels/',{headers:this.httpHeaders});
  }

  getSelectedHotel(id:any):Observable<any[]>{
    return this.http.get<any[]>(this.baseAPIUrl + '/hotels/' + id + '/',{headers:this.httpHeaders});
  }


  getActivitiesList():Observable<any[]>{
    return this.http.get<any[]>(this.baseAPIUrl + '/activities/',{headers:this.httpHeaders});
  }

  getSelectedActivity(id:any):Observable<any[]>{
    return this.http.get<any[]>(this.baseAPIUrl + '/activities/' + id + '/',{headers:this.httpHeaders});
  }

  getSelectedBooking(id:any):Observable<any[]>{
    return this.http.get<any[]>(this.baseAPIUrl + '/booking-details/' + id + '/',{headers:this.httpHeaders})
  }

  postConfirmBooking(val:number):Observable<any>{
    console.log("From service.ts file its getting package:",val);
    return this.http.post<any>(this.baseAPIUrl + '/create-booking/',{travel_package_id: val},{headers:this.httpHeaders});
  }

}
