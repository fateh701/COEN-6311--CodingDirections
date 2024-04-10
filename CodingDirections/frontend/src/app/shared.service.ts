import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders, HttpParams} from '@angular/common/http';
import {Observable, Subscription} from 'rxjs';
import {AuthService} from "./auth.service";
import { User } from "./authentication/authentication.model";
import { webSocket, WebSocketSubject } from 'rxjs/webSocket';

@Injectable({
  providedIn: 'root'
})
export class SharedService {
  // public webSocketSubject: WebSocketSubject<any>;

  readonly baseAPIUrl = "http://127.0.0.1:8000";
  httpHeaders = new HttpHeaders({'Content-Type':'application/json',
   'Authorization':`Bearer ${this.authService.getUserToken()}`,  //will pass token of loggedin user
    });

  constructor(private http:HttpClient,private authService:AuthService) {
    // this.webSocketSubject = webSocket('ws://localhost:8000/ws/notify/'); //for Realtime notifications setup

   }

  getFlightsList():Observable<any[]>{
    return this.http.get<any[]>(this.baseAPIUrl + '/flights/',{headers:this.httpHeaders});
  }

  editFlight(id: number, data: any) {
  return this.http.put<any>(`${this.baseAPIUrl}/flights/${id}/`, data, { headers: this.httpHeaders });
}

  deleteFlight(id: number) {
    return this.http.delete<any>(`${this.baseAPIUrl}/flights/${id}/`, { headers: this.httpHeaders });
  }

  addFlight(data: any) {
    return this.http.post<any>(`${this.baseAPIUrl}/flights/`, data, { headers: this.httpHeaders });
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

  editHotel(id: number, data: any) {
  return this.http.put<any>(`${this.baseAPIUrl}/hotels/${id}/`, data, { headers: this.httpHeaders });
}

  deleteHotel(id: number) {
    return this.http.delete<any>(`${this.baseAPIUrl}/hotels/${id}/`, { headers: this.httpHeaders });
  }

  addHotel(data: any) {
    return this.http.post<any>(`${this.baseAPIUrl}/hotels/`, data, { headers: this.httpHeaders });
  }

  getSelectedHotel(id:any):Observable<any[]>{
    return this.http.get<any[]>(this.baseAPIUrl + '/hotels/' + id + '/',{headers:this.httpHeaders});
  }


  getActivitiesList():Observable<any[]>{
    return this.http.get<any[]>(this.baseAPIUrl + '/activities/',{headers:this.httpHeaders});
  }

  editActivity(id: number, data: any) {
  return this.http.put<any>(`${this.baseAPIUrl}/activities/${id}/`, data, { headers: this.httpHeaders });
}

  deleteActivity(id: number) {
    return this.http.delete<any>(`${this.baseAPIUrl}/activities/${id}/`, { headers: this.httpHeaders });
  }

  addActivity(data: any) {
    return this.http.post<any>(`${this.baseAPIUrl}/activities/`, data, { headers: this.httpHeaders });
  }

  getSelectedActivity(id:any):Observable<any[]>{
    return this.http.get<any[]>(this.baseAPIUrl + '/activities/' + id + '/',{headers:this.httpHeaders});
  }

  // getSelectedBooking(id:any):Observable<any[]>{
  //   return this.http.get<any[]>(this.baseAPIUrl + '/booking-details/' + id + '/',{headers:this.httpHeaders})
  // }

  postConfirmBooking(val:number,userid:number):Observable<any>{
    const headers = new HttpHeaders({'Content-Type':'application/json',
    'Authorization':`Bearer ${this.authService.getUserToken()}`,  //will pass token of loggedin user
    });
    console.log("From service.ts file its getting package:",val,headers);
    return this.http.post<any>(this.baseAPIUrl + '/create-booking/',{ travel_package_id: val, user_id:userid },{ headers:headers });
  }

  getAllBookingsByID(userid:any):Observable<any[]>{
    return this.http.get<any[]>(this.baseAPIUrl + '/customerBookings/?user_id='+userid,{headers:this.httpHeaders});
  }
 deleteBooking(bookingId: number) {
  return this.http.delete(`${this.baseAPIUrl}/booking-details/${bookingId}`);
  }
  getTravelPackageVsBookingCountData(startDate: string | null, endDate: string | null):Observable<any[]>{
    if ((startDate=='' && endDate=='') || (startDate==null && endDate==null)){
      return this.http.get<any[]>(this.baseAPIUrl+'/tpvscount/',{headers:this.httpHeaders});
    }
    else {
      let params = new HttpParams()
      if (startDate){
        params = params.append('startDate',startDate)
      }
      if (endDate){
        params = params.append('endDate',endDate)
      }
      return this.http.get<any[]>(this.baseAPIUrl+'/tpvscount/',{headers:this.httpHeaders,params:params});
    }
  }

  getRevenuePerPackageData(startDate: string | null, endDate: string | null):Observable<any[]>{
    if ((startDate=='' && endDate=='') || (startDate==null && endDate==null)){
      return this.http.get<any[]>(this.baseAPIUrl+'/revenue/',{headers:this.httpHeaders});
    }
    else {
      let params = new HttpParams()
      if (startDate){
        params = params.append('startDate',startDate)
      }
      if (endDate){
        params = params.append('endDate',endDate)
      }
      return this.http.get<any[]>(this.baseAPIUrl+'/revenue/',{headers:this.httpHeaders,params:params});
    }
  }

  //for user managements
  getUsersList():Observable<User[]>{
    return this.http.get<User[]>(this.baseAPIUrl + '/users/',{headers:this.httpHeaders});
  }

  //it will work for user deletion
  deleteUser(userId: string | undefined): Observable<void> {
    return this.http.delete<void>(`${this.baseAPIUrl}/users/${userId}/`, { headers: this.httpHeaders });
  }

  //for Agent managements
  getAgentsList():Observable<User[]>{
    return this.http.get<User[]>(this.baseAPIUrl + '/agents/',{headers:this.httpHeaders});
  }

  deleteAgent(agentId: string | undefined): Observable<void> {
    return this.http.delete<void>(`${this.baseAPIUrl}/agents/${agentId}/`, { headers: this.httpHeaders });
  }



}



