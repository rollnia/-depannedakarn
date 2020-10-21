import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AppGetService {

  constructor(private http: HttpClient) { }

  public userType() {
    return this.http.get<any>('https://depannedakar.skylineserves.in/api/auth/user');
  }
  public logoutUser() {
    return this.http.get<any>('https://depannedakar.skylineserves.in/api/auth/logout');
  }
}
