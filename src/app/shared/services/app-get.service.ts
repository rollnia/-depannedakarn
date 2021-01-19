import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ToastController } from '@ionic/angular';
import { environment } from "../../../environments/environment";
import { Subject, BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AppGetService {
  private myToast: any;
  public listingData: BehaviorSubject<any> = new BehaviorSubject<any>('');
  public bookingDetailsData: BehaviorSubject<any> = new BehaviorSubject<any>('');

  constructor(private http: HttpClient, private toast: ToastController) { }

  public showToast(msg) {
    this.myToast = this.toast.create({
      message: msg,
      duration: 3000,
      position: 'bottom'
    }).then((toastData) => {
      toastData.present();
    });
  }

  public userType() {
    return this.http.get<any>(`${environment.apiUrl}auth/user`);
  }
  public logoutUser() {
    return this.http.get<any>(`${environment.apiUrl}auth/logout`);
  }

  public getSearchData() {
    return this.http.get<any>(`${environment.apiUrl}auth/searchprovider`);
  }

  public getCardDetails(custID) {
    return this.http.get<any>(`${environment.apiUrl}auth/getallcard?cust_id=${custID}`);
  }

  public getListing(params) {
    return this.http.get<any>(`${environment.apiUrl}auth/listprovider?selectdate=${params.selectdate}&start_time=${params.start_time}&end_time=${params.end_time}&location=${params.location}&service_type=${params.service_type}&provider_id=${params.provider_id}`);
  }

  public getHistory(clientid) {
    return this.http.get<any>(`${environment.apiUrl}auth/bookinghistory?clientid=${clientid}`);
  }

  public getDemandProgress(clientid) {
    return this.http.get<any>(`${environment.apiUrl}auth/demadprogress?clientid=${clientid}`);
  }

  public getCompleteMission(providerid) {
    return this.http.get<any>(`${environment.apiUrl}auth/mesmissioncomplete?providerid=${providerid}`);
  }

  public getMisMission(providerId) {
    return this.http.get<any>(`${environment.apiUrl}auth/mesmission?providerid=${providerId}`);
  }

  public getNotifcations(providerId) {
    return this.http.get<any>(`${environment.apiUrl}auth/allnotificationbyprovider?providerid=${providerId}`);
  }

  public getNotificationCount(providerid) {
    return this.http.get<any>(`${environment.apiUrl}auth/newnotificationbyprovider?providerid=${providerid}`);
  }

  public getNotificationDetail(param) {
    return this.http.get<any>(`${environment.apiUrl}auth/demadprogressdetail?bookingid=${param[1]}`);
  }

  public getBookingDetail(param) {
    const user = JSON.parse(localStorage.getItem('currentUserData'));
    if (user['user_type'] === 'client' || param.length > 3) {
      return this.http.get<any>(`${environment.apiUrl}auth/demadprogressdetail?bookingid=${param[0]}`);
    } else if (user['user_type'] === 'provider') {
      return this.http.get<any>(`${environment.apiUrl}auth/mesmissiondetail?bookingid=${param[0]}`);
    }

  }

  public myPayment(params) {
    return this.http.get<any>(`${environment.apiUrl}auth/providerpayment?providerid=${params.providerid}&from_date=${params.from_date}&to_date=${params.to_date}`);
  }

  public getServiceList(providerId) {
    return this.http.get<any>(`${environment.apiUrl}auth/getavailabilitybyprovider?providerid=${providerId}`);
  }

  public confirmPayment(payload) {
    return this.http.get<any>(`${environment.apiUrl}auth/confirmstripe?payment_intent=${payload.id}&payment_intent_client_secret=${payload.client_secret}`);
  }

  public checkStatus(invoiceid) {
    return this.http.get<any>(`${environment.apiUrl}auth/confirmbitpay?invoiceid=${invoiceid}`);
  }
}
