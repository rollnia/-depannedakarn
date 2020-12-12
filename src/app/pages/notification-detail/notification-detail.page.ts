import { Component, OnInit } from '@angular/core';
import { Subscription } from "rxjs";
import * as moment from 'moment';
import { LoadingController, Platform } from '@ionic/angular';
import { Router, ActivatedRoute } from '@angular/router';

import { AppGetService } from "../../shared/services/app-get.service";
import { AppPostService } from "../../shared/services/app-post.service";

@Component({
  selector: 'app-notification-detail',
  templateUrl: './notification-detail.page.html',
  styleUrls: ['./notification-detail.page.scss'],
})
export class NotificationDetailPage {
  public subscriptions: Subscription[] = [];
  public details;
  rating;
  loading: any;
  return: string = '';
  constructor(private platform: Platform, private route: ActivatedRoute, private router: Router, private appGetService: AppGetService, private appPostService: AppPostService, public loadingController: LoadingController) {

  }

  ionViewWillEnter() {
    this.route.queryParams.subscribe(params => {
      this.return = params && params.return ? params.return : '';
    });
    const backEvent = this.platform.backButton.subscribe(() => {
      this.router.navigate(['/notifications']);
    });
    this.subscriptions.push(backEvent);
    this.loadListing();
  }

  private async loadListing() {
    this.loading = await this.loadingController.create({
      message: 'Loading please wait',
    });
    this.loading.present();

    const subs = this.appGetService.getNotificationDetail(this.return).subscribe(res => {
      if (res?.bookingdetails && res?.providerdetails) {
        this.details = res;
        this.rating = res['rating'] && res['rating'].length ? res['rating'][0]['rating'] : undefined;
      }
      this.setNotificationRead();
      this.loading.dismiss();
    }, error => {
      this.loading.dismiss();
      console.error(error);
    });
    this.subscriptions.push(subs);
  }

  private setNotificationRead() {
    const reqObj = {
      notificationid: this.return[0]
    };
    const subs = this.appPostService.getNotificationRead(reqObj).subscribe(res => {
    }, error => {
      console.error(error);
    });
    this.subscriptions.push(subs);
  }

  public getStartTime(sTime) {
    let time = sTime.slice(0, -3);
    time = time.toString().match(/^([01]\d|2[0-3])(:)([0-5]\d)(:[0-5]\d)?$/) || [time];

    if (time.length > 1) { // If time format correct
      time = time.slice(1);  // Remove full string match value
      time[5] = +time[0] < 12 ? ' AM' : ' PM'; // Set AM/PM
      time[0] = +time[0] % 12 || 12; // Adjust hours
    }
    return time.join('');
  }

  public getDateFormat(date) {
    const formatDate = moment(moment(date)['_d']).format('ll');
    return formatDate;
  }
}
