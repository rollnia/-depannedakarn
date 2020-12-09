import { Component, OnInit } from '@angular/core';
import { Subscription } from "rxjs";
import * as moment from 'moment';
import { LoadingController, AlertController, Platform } from '@ionic/angular';
import { Router, ActivatedRoute } from '@angular/router';
import { AppGetService } from "../../shared/services/app-get.service";
import { AppPostService } from "../../shared/services/app-post.service";

@Component({
  selector: 'app-bookingdetail',
  templateUrl: './bookingdetail.page.html',
  styleUrls: ['./bookingdetail.page.scss'],
})
export class BookingdetailPage {
  public subscriptions: Subscription[] = [];
  public details;
  public isenabled = false;
  loading: any;
  return: string = '';
  rating;
  public colorCoding = 'danger';
  public isReadOnly = true;
  constructor(private platform: Platform, private appPostService: AppPostService, private appGetService: AppGetService, private route: ActivatedRoute, public loadingController: LoadingController, private router: Router, private alertCtrl: AlertController) { }

  ionViewWillEnter() {

    this.route.queryParams.subscribe(params => {
      this.return = params && params.return ? params.return : '';
    });
    const backEvent = this.platform.backButton.subscribe(() => {
      if (this.return && this.return.length == 2) {
        this.router.navigate(['/history']);
      } else if (this.return && this.return.length > 3) {
        this.router.navigate(['/monpaiment']);
      } else {
        this.router.navigate(['/demand-in-progress']);
      }
    });
    this.subscriptions.push(backEvent);
    this.loadListing();
  }

  ionViewDidLeave() {
    this.subscriptions.forEach(subs => subs.unsubscribe());
  }

  private async loadListing() {
    this.colorCoding = 'danger';
    this.isenabled = false;
    this.loading = await this.loadingController.create({
      message: 'Loading please wait',
    });
    this.loading.present();

    const subs = this.appGetService.getBookingDetail(this.return).subscribe(res => {
      if (res?.bookingdetails && res?.providerdetails) {
        this.details = res;
        this.rating = res['rating'] && res['rating'].length ? res['rating'][0]['rating'] : undefined;
      } else if (res?.bookingdetails && res?.clientdetails) {
        this.details = res;
      }
      this.loading.dismiss();
    }, error => {
      this.loading.dismiss();
      console.error(error);
    });
    this.subscriptions.push(subs);
  }

  public setStar(point) {
    if (!point) return 0;
    return `${(point * 20)}px`;
  }

  public changeRate(evt) {
    // console.log(evt);
    const pID = this.details.providerdetails && this.details.providerdetails.length ? this.details.providerdetails[0]['id'] : '';
    const reqObj = {
      providerid: pID,
      bookingid: this.details.bookingdetails['id'],
      rating: evt
    };
    const subs = this.appPostService.ratingSet(reqObj).subscribe(res => {
      if (res?.message) {
        this.appGetService.showToast(res['message']);
      }
    }, error => {
      console.log(error);
    })
  }

  public async cancelBooking() {
    const pID = this.details.providerdetails && this.details.providerdetails.length ? this.details.providerdetails[0]['id'] : '';
    const reqObj = {
      bookingid: this.details.bookingdetails['id']
    };
    this.loading = await this.loadingController.create({
      message: 'Loading please wait',
    });
    this.loading.present();
    const subs = this.appPostService.cancelBookng(reqObj).subscribe(res => {
      this.loading.dismiss();
      if (res?.message) {
        this.isenabled = true;
        this.colorCoding = 'medium';
        this.appGetService.showToast(res['message']);
      }
    }, error => {
      this.loading.dismiss();
      console.log(error);
    })
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

  public reBook() {
    const pID = this.details.providerdetails && this.details.providerdetails.length ? this.details.providerdetails[0]['id'] : '';
    const bID = this.details.bookingdetails ? this.details.bookingdetails['id'] : '';
    const params = [pID, bID];
    this.router.navigate(['/searchprovider'], {
      queryParams: {
        return: params
      }
    });
  }

  public getDateFormat(date) {
    const formatDate = moment(moment(date)['_d']).format('ll');
    return formatDate;
  }

  public completeBooking() {
    const reqObj = {
      bookingid: this.details.bookingdetails['id']
    };
    const subs = this.appPostService.completeBookng(reqObj).subscribe(res => {
      if (res?.message) {
        this.isenabled = true;
        this.colorCoding = 'medium';
        this.appGetService.showToast(res['message']);
      }
    }, error => {
      console.log(error);
    })
  }

}
