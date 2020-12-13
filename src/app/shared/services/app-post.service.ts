import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { environment } from "../../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class AppPostService {

  constructor(private http: HttpClient) { }

  public signupUser(payload) {
    return this.http.post<any>(`${environment.apiUrl}auth/register`, payload);
  }

  public editProfileAccnt(payload) {
    return this.http.post<any>(`${environment.apiUrl}auth/edituser`, payload);
  }

  public loginUser(payload) {
    return this.http.post<any>(`${environment.apiUrl}auth/login`, payload);
  }

  public paymentSuccess(payload) {
    return this.http.post<any>(`${environment.apiUrl}auth/bookservice`, payload);
  }

  public ratingSet(payload) {
    return this.http.post<any>(`${environment.apiUrl}auth/saveupdaterating`, payload);
  }

  public cancelBookng(payload) {
    return this.http.post<any>(`${environment.apiUrl}auth/cancelbooking`, payload);
  }

  public completeBookng(payload) {
    return this.http.post<any>(`${environment.apiUrl}auth/completebooking`, payload);
  }

  public getNotificationRead(obj) {
    return this.http.post<any>(`${environment.apiUrl}auth/notificationread`, obj);
  }

  public updateAvaibility(payload) {
    return this.http.post<any>(`${environment.apiUrl}auth/activedeactiveavailability`, payload);
  }

  public updateServiceAvaibility(payload) {
    return this.http.post<any>(`${environment.apiUrl}auth/updateavailability`, payload);
  }
}
