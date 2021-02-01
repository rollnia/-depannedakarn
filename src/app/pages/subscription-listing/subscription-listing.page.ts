import { Component, OnInit, ViewChild } from '@angular/core';
import { Subscription } from "rxjs";
import { LoadingController, Platform } from '@ionic/angular';
import { Router, ActivatedRoute } from '@angular/router';
import * as moment from 'moment';
import { AppGetService } from "../../shared/services/app-get.service";
@Component({
  selector: 'app-subscription-listing',
  templateUrl: './subscription-listing.page.html',
  styleUrls: ['./subscription-listing.page.scss'],
})
export class SubscriptionListingPage implements OnInit {
  @ViewChild('rating') rating: any;
  public listinData = [];
  public searchData: any;
  public subscriptions: Subscription[] = [];
  loading: any;
  return: string = '';
  constructor(private platform: Platform, private route: ActivatedRoute, private router: Router, private appGetService: AppGetService, public loadingController: LoadingController) {

  }

  ngOnInit() {
    this.loadListing();
  }

  ionViewWillEnter() {
    this.route.queryParams.subscribe(params => {
      this.return = params && params.return ? params.return : '';
    });
    const backEvent = this.platform.backButton.subscribe(() => {
      this.router.navigate(['/subscription']);
    });
    this.subscriptions.push(backEvent);
  }

  private async loadListing() {
    this.loading = await this.loadingController.create({
      message: 'Loading please wait',
    });
    this.loading.present();

    const subs = this.appGetService.listingData.subscribe(res => {
      if (res?.listing) {
        this.loading.dismiss();
        this.listinData = res['listing'];
        this.searchData = res['params'];
      } else {
        this.loading.dismiss();
      }
    })
  }

  public setStar(point) {
    if (!point) return 0;
    return `${(point * 20)}px`;
  }

  public getDateFormat(date) {
    const formatDate = moment(moment(date)['_d']).format('ll');
    return formatDate;
  }

  public getStartTime(sTime) {
    let time = sTime.slice(0, -3);
    time = time.toString().match(/^([01]\d|2[0-3])(:)([0-5]\d)(:[0-5]\d)?$/) || [time];
    let hrs;
    let mins;
    if (time.length) {
      let timeData = time[0].split(':');
      hrs = timeData[0].length < 2 ? `0${timeData[0]}` : timeData[0];
      mins = timeData[1].length < 2 ? `0${timeData[1]}` : timeData[1];
      time = `${hrs}:${mins}`;
    }
    // if (time.length > 1) { // If time format correct
    //   time = time.slice(1);  // Remove full string match value
    //   time[5] = +time[0] < 12 ? ' AM' : ' PM'; // Set AM/PM
    //   time[0] = +time[0] % 12 || 12; // Adjust hours
    // }
    return time;
  }

  public getHours(sTime, eTime) {
    const time_start: any = new Date();
    const time_end: any = new Date();
    const value_start = sTime.split(':');
    const value_end = eTime.split(':');

    time_start.setHours(value_start[0], value_start[1], value_start[2], 0)
    time_end.setHours(value_end[0], value_end[1], value_end[2], 0)

    const hrs = Math.ceil((time_end - time_start) / 60 / 60 / 1000);
    return hrs;
  }

  public getAmount(sTime, eTime, amount) {
    const hrs = this.getHours(sTime, eTime);
    return hrs * Number(amount);

  }

  public getSubscriptionAmount(sTime, eTime, amount) {
    const user = JSON.parse(localStorage.getItem('currentUserData'));
    const hrs = this.getHours(sTime, eTime);
    const tot_amt = hrs * Number(amount);
    const percentage = tot_amt - (tot_amt / 100) * user['subscription'];
    return percentage;
  }

  public navigate() {
    this.router.navigate(['/subscription']);
  }

  public bookService() {
    let tempArr = [];
    this.searchData.forEach((ele, index) => {
      let payload = {};
      payload['amt'] = this.getSubscriptionAmount(ele.start_time, ele.end_time, this.listinData[index].amount);
      payload['bookingdate'] = ele.bookingdate;
      payload['start_time'] = ele.start_time;
      payload['end_time'] = ele.end_time;
      payload['id'] = this.listinData[index].id;
      payload['hrs'] = this.getHours(ele.start_time, ele.end_time);
      tempArr.push(payload);
      payload = {};
    })
    // const amt = this.getSubscriptionAmount(this.searchData.start_time, this.searchData.end_time, this.listinData[0].amount)
    // const user = JSON.parse(localStorage.getItem('currentUserData'));
    // const hrs = this.getHours(this.searchData.start_time, this.searchData.end_time);
    // const service_id = user['service_id'];
    this.appGetService.subscriptionData.next(tempArr);
    // const params = ['/payment', amt, this.searchData.bookingdate, this.searchData.start_time, this.searchData.end_time, this.listinData[0].id, hrs];
    this.router.navigate(['/payment']);
  }

}
