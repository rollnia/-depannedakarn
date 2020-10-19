import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AppGetService {

  constructor(private http: HttpClient) { }

  public userType() {
    return this.http.get<any>('http://depannedakar.skylineserves.in/api/auth/user');
  }
}
