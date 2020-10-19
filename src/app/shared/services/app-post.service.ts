import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AppPostService {

  constructor(private http: HttpClient) { }

  public signupUser(payload) {
    return this.http.post<any>('https://depannedakar.skylineserves.in/api/auth/register', payload);
  }

  public loginUser(payload) {
    return this.http.post<any>('https://depannedakar.skylineserves.in/api/auth/login', payload);
  }
}
