import { Component, OnInit, ViewChild } from '@angular/core';
import { Subscription } from "rxjs";
import { LoadingController } from '@ionic/angular';

import { AppGetService } from "../../shared/services/app-get.service";

@Component({
  selector: 'app-listing',
  templateUrl: './listing.page.html',
  styleUrls: ['./listing.page.scss'],
})
export class ListingPage implements OnInit {
  @ViewChild('rating') rating: any;
  public listinData = [];
  public subscriptions: Subscription[] = [];
  loading: any;
  constructor(private appGetService: AppGetService, public loadingController: LoadingController) { }

  ngOnInit() {
    this.loadListing();
  }

  ngOnDestroy() {
    this.subscriptions.forEach(subs => subs.unsubscribe());
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
      } else {
        this.loading.dismiss();
      }
    })
  }

  public setStar(point) {
    if (!point) return 0;
    return `${(point * 20)}px`;
  }

}
