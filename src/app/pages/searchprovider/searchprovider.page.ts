import { Component, OnInit } from '@angular/core';
import { Subscription } from "rxjs";
import { LoadingController } from '@ionic/angular';

import { AppGetService } from "../../shared/services/app-get.service";

@Component({
  selector: 'app-searchprovider',
  templateUrl: './searchprovider.page.html',
  styleUrls: ['./searchprovider.page.scss'],
})
export class SearchproviderPage implements OnInit {
  public searchProviderData: any;
  date;
  public searchProviderModel = {
    location: '',
    service: ''
  };
  public subscriptions: Subscription[] = [];
  loading: any;
  constructor(private appGetService: AppGetService, public loadingController: LoadingController,) { }

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

  public submitSearchData() {
    console.log(this.searchProviderModel);
    console.log((<HTMLInputElement>document.getElementById("date")).value);
    console.log((<HTMLInputElement>document.getElementById("startTime")).value);
    console.log((<HTMLInputElement>document.getElementById("endTime")).value);
    console.log(new Date((<HTMLInputElement>document.getElementById("startTime")).value).getHours());
    console.log(new Date((<HTMLInputElement>document.getElementById("startTime")).value).getMinutes());
  }

}
