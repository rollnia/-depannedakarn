import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { environment } from "../../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class AppGetService {

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
}
