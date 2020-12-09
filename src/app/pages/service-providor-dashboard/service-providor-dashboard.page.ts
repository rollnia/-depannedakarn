import { Component, OnInit } from '@angular/core';
import { Subscription } from "rxjs";
import { Platform } from '@ionic/angular';
import { Router } from '@angular/router';
@Component({
  selector: 'app-service-providor-dashboard',
  templateUrl: './service-providor-dashboard.page.html',
  styleUrls: ['./service-providor-dashboard.page.scss'],
})
export class ServiceProvidorDashboardPage {
  public subscriptions: Subscription[] = [];
  constructor(
    private platform: Platform, private router: Router) {
  }

  ionViewWillEnter() {
    const backEvent = this.platform.backButton.subscribe(() => {
      navigator['app'].exitApp();
    });
    this.subscriptions.push(backEvent);
  }

  ionViewDidLeave() {
    this.subscriptions.forEach(subs => subs.unsubscribe());
  }

  ngOnInit() {
  }

  public navigate(url) {
    this.router.navigate([url]);
  }

}
