import { Component, OnInit } from '@angular/core';
import { Subscription } from "rxjs";
import { LoadingController, AlertController, Platform } from '@ionic/angular';
import { Router, ActivatedRoute } from '@angular/router';
import { AppGetService } from "../../shared/services/app-get.service";

@Component({
  selector: 'app-bookingdetail',
  templateUrl: './bookingdetail.page.html',
  styleUrls: ['./bookingdetail.page.scss'],
})
export class BookingdetailPage implements OnInit {
  public subscriptions: Subscription[] = [];
  public details;
  loading: any;
  return: string = '';
  constructor(private platform: Platform, private appGetService: AppGetService, private route: ActivatedRoute, public loadingController: LoadingController, private router: Router, private alertCtrl: AlertController) { }

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
      }
      this.loading.dismiss();
    }, error => {
      this.loading.dismiss();
      console.error(error);
    });
    this.subscriptions.push(subs);
  }


}
