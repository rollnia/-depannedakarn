import { Component, OnInit } from '@angular/core';
import { Subscription } from "rxjs";
import { Platform } from '@ionic/angular';
import { Router } from '@angular/router';
import { AppGetService } from "../../shared/services/app-get.service";

@Component({
  selector: 'app-service-providor-dashboard',
  templateUrl: './service-providor-dashboard.page.html',
  styleUrls: ['./service-providor-dashboard.page.scss'],
})
export class ServiceProvidorDashboardPage {
  public subscriptions: Subscription[] = [];
  public countnotification = 0;
  public interval;
  public user;
  constructor(
    private platform: Platform, private router: Router, private appGetService: AppGetService,) {
  }

  ionViewWillEnter() {
    const backEvent = this.platform.backButton.subscribe(() => {
      navigator['app'].exitApp();
    });
    this.subscriptions.push(backEvent);
    this.checkNotification();
    this.interval = setInterval(() => {
      this.checkNotification();
    }, 5000);

  }

  ionViewDidEnter() {
    this.user = JSON.parse(localStorage.getItem('currentUserData'));
  }

  ionViewDidLeave() {
    clearInterval(this.interval);
    this.subscriptions.forEach(subs => subs.unsubscribe());
  }

  public setStar(point) {
    if (!point) return 0;
    return `${(point * 20)}px`;
  }

  public navigate(url) {
    this.router.navigate([url]);
  }

  public checkNotification() {
    const user = JSON.parse(localStorage.getItem('currentUserData'));
    const subs = this.appGetService.getNotificationCount(user['user_id']).subscribe(res => {
      if (res?.countnotification) {
        this.countnotification = res['countnotification'];
      }
    }, error => {
      console.error(error);
    });
    this.subscriptions.push(subs);
  }

}
