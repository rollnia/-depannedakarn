import { Component, OnInit } from '@angular/core';
import { Subscription } from "rxjs";
import { LoadingController, AlertController, Platform } from '@ionic/angular';
import { Router, ActivatedRoute } from '@angular/router';
import { AppGetService } from "../../shared/services/app-get.service";
import { AppPostService } from "../../shared/services/app-post.service";

@Component({
  selector: 'app-bookingdetail',
  templateUrl: './bookingdetail.page.html',
  styleUrls: ['./bookingdetail.page.scss'],
})
export class BookingdetailPage implements OnInit {
  public subscriptions: Subscription[] = [];
  public details;
  public isenabled = false;
  loading: any;
  return: string = '';
  public colorCoding = 'danger';
  rating: string = '';
  constructor(private platform: Platform, private appPostService: AppPostService, private appGetService: AppGetService, private route: ActivatedRoute, public loadingController: LoadingController, private router: Router, private alertCtrl: AlertController) { }

  ngOnInit() {
    // this.loadListing();
  }

  ionViewWillEnter() {
    const backEvent = this.platform.backButton.subscribe(() => {
      this.router.navigate(['/demand-in-progress']);
    });
    this.subscriptions.push(backEvent);
    this.route.queryParams.subscribe(params => {
      this.return = params && params.return ? JSON.parse(params.return) : '';
    });
    this.loadListing();
  }

  private async loadListing() {
    this.loading = await this.loadingController.create({
      message: 'Loading please wait',
    });
    this.loading.present();

    const subs = this.appGetService.getBookingDetail(this.return).subscribe(res => {
      if (res?.bookingdetails && res?.providerdetails) {
        this.details = res;
        this.rating = res['rating'] && res['rating'].length ? res['rating'][0]['rating'] : '';
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

  public changeRate() {
    const pID = this.details.providerdetails && this.details.providerdetails.length ? this.details.providerdetails[0]['id'] : '';
    const reqObj = {
      providerid: pID,
      bookingid: this.details.bookingdetails['id'],
      rating: this.rating
    };
    const subs = this.appPostService.ratingSet(reqObj).subscribe(res => {

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
    const alert = await this.alertCtrl.create({
      cssClass: 'my-custom-class',
      header: 'Alert',
      subHeader: '',
      message: 'Booking Canceled',
      buttons: ['OK']
    });
    const subs = this.appPostService.cancelBookng(reqObj).subscribe(res => {
      this.loading.dismiss();
      if (res?.message) {
        this.isenabled = true;
        this.colorCoding = 'medium';
        alert.present();
      }
    }, error => {
      this.loading.dismiss();
      console.log(error);
    })
  }


}
