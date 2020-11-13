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

  public loginUser(payload) {
    return this.http.post<any>(`${environment.apiUrl}auth/login`, payload);
  }

  public paymentSuccess(payload) {
    return this.http.post<any>(`${environment.apiUrl}auth/bookservice`, payload);
  }
}
