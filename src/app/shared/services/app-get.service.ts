import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { environment } from "../../../environments/environment";
import { Subject, BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AppGetService {

  public listingData: BehaviorSubject<any> = new BehaviorSubject<any>('');
  public bookingDetailsData: BehaviorSubject<any> = new BehaviorSubject<any>('');

  constructor(private http: HttpClient) { }

  public userType() {
    return this.http.get<any>(`${environment.apiUrl}auth/user`);
  }
  public logoutUser() {
    return this.http.get<any>(`${environment.apiUrl}auth/logout`);
  }

  public getSearchData() {
    return this.http.get<any>(`${environment.apiUrl}auth/searchprovider`);
  }

  public getListing(params) {
    return this.http.get<any>(`${environment.apiUrl}auth/listprovider?selectdate=${params.selectdate}&start_time=${params.start_time}&end_time=${params.end_time}&location=${params.location}&service_type=${params.service_type}`);
  }

  public getHistory(clientid) {
    return this.http.get<any>(`${environment.apiUrl}auth/bookinghistory?clientid=${clientid}`);
  }

  public getDemandProgress(clientid) {
    return this.http.get<any>(`${environment.apiUrl}auth/demadprogress?clientid=${clientid}`);
  }
  public getBookingDetail(id) {
    return this.http.get<any>(`${environment.apiUrl}auth/demadprogressdetail?bookingid=${id}`);
  }
}
