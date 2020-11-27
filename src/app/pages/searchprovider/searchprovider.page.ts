import { Component, OnInit } from '@angular/core';
import { Subscription } from "rxjs";
import { LoadingController, AlertController, Platform } from '@ionic/angular';
import { Router } from '@angular/router';

import { AppGetService } from "../../shared/services/app-get.service";

@Component({
  selector: 'app-searchprovider',
  templateUrl: './searchprovider.page.html',
  styleUrls: ['./searchprovider.page.scss'],
})
export class SearchproviderPage {
  public searchProviderData: any;
  date = (new Date()).toISOString();
  endTime: any = new Date();
  public minDate = (new Date).toISOString().split('T')[0];
  public searchProviderModel = {
    location: '',
    service: ''
  };
  public subscriptions: Subscription[] = [];
  loading: any;
  constructor(private platform: Platform, private appGetService: AppGetService, public loadingController: LoadingController, private router: Router, private alertCtrl: AlertController) {
    this.endTime.setHours(this.endTime.getHours() + 1);
    this.endTime = this.endTime.toISOString();
  }

  ionViewWillEnter() {
    const user = JSON.parse(localStorage.getItem('currentUserData'));
    const backEvent = this.platform.backButton.subscribe(() => {
      if (!user) {
        this.router.navigate(['/home']);
      } else if (user['user_type'] === 'client') {
        this.router.navigate(['/user-dashboard']);
      }
    });
    this.subscriptions.push(backEvent);
    this.loadData();
  }

  ionViewDidLeave() {
    this.subscriptions.forEach(subs => subs.unsubscribe());
  }

  private async loadData() {
    this.loading = await this.loadingController.create({
      message: 'Loading please wait',
    });
    this.loading.present();
    const subs = this.appGetService.getSearchData().subscribe(res => {
      if (res?.location && res?.service) {
        this.loading.dismiss();
        this.searchProviderData = res;
        this.searchProviderModel['location'] = this.searchProviderData['location'][0]['id'];
        this.searchProviderModel['service'] = this.searchProviderData['service'][0]['id'];
      }
    }, error => {
      this.loading.dismiss();
      console.error(error);
    });
    this.subscriptions.push(subs);
  }

  public chckTime(sTime, eTime) {
    const time_start: any = new Date();
    const time_end: any = new Date();
    const value_start = sTime.split(':');
    const value_end = eTime.split(':');

    time_start.setHours(value_start[0], value_start[1], value_start[2], 0)
    time_end.setHours(value_end[0], value_end[1], value_end[2], 0)

    const hrs = time_end <= time_start;
    return hrs;
  }

  public async submitSearchData() {
    const params = {};
    params['location'] = this.searchProviderModel.location;
    params['service_type'] = this.searchProviderModel.service;
    params['selectdate'] = ((<HTMLInputElement>document.getElementById("date")).value).split('T')[0];
    params['start_time'] = `${new Date((<HTMLInputElement>document.getElementById("startTime")).value).getHours()}:${new Date((<HTMLInputElement>document.getElementById("startTime")).value).getMinutes()}:00`;
    params['end_time'] = `${new Date((<HTMLInputElement>document.getElementById("endTime")).value).getHours()}:${new Date((<HTMLInputElement>document.getElementById("endTime")).value).getMinutes()}:00`;

    // console.log(params);
    this.loading = await this.loadingController.create({
      message: 'Loading please wait',
    });
    this.loading.present();
    this.appGetService.listingData.next('');
    const alert = await this.alertCtrl.create({
      cssClass: 'my-custom-class',
      header: 'Alert',
      subHeader: '',
      message: 'End Time cannot less than Start Time.',
      buttons: ['OK']
    });


    if (this.chckTime(params['start_time'], params['end_time'])) {
      this.loading.dismiss();
      await alert.present();
      return;
    }
    const user = JSON.parse(localStorage.getItem('currentUserData'));
    user['service_id'] = params['service_type'];
    localStorage.setItem('currentUserData', JSON.stringify(user));
    const subs = this.appGetService.getListing(params).subscribe(res => {
      if ((res?.listing && res.listing.length) || (res?.params && Object.keys(res.params).length)) {
        this.loading.dismiss();
        this.appGetService.listingData.next(res);
        this.router.navigate(['/listing']);
      }
    }, error => {
      this.loading.dismiss();
      console.error(error);
    });
    this.subscriptions.push(subs);
  }

}
