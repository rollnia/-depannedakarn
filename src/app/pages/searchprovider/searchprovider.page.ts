import { Component, OnInit } from '@angular/core';
import { Subscription } from "rxjs";
import { LoadingController } from '@ionic/angular';
import { Router } from '@angular/router';

import { AppGetService } from "../../shared/services/app-get.service";

@Component({
  selector: 'app-searchprovider',
  templateUrl: './searchprovider.page.html',
  styleUrls: ['./searchprovider.page.scss'],
})
export class SearchproviderPage implements OnInit {
  public searchProviderData: any;
  date = new Date();
  public minDate = (new Date).toISOString().split('T')[0];
  public searchProviderModel = {
    location: '',
    service: ''
  };
  public subscriptions: Subscription[] = [];
  loading: any;
  constructor(private appGetService: AppGetService, public loadingController: LoadingController, private router: Router) { }

  ngOnInit() {
    this.loadData();
  }

  ngOnDestroy() {
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
