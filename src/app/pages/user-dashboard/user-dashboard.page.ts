import { Component, OnInit } from '@angular/core';
import { Platform } from '@ionic/angular';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-user-dashboard',
  templateUrl: './user-dashboard.page.html',
  styleUrls: ['./user-dashboard.page.scss'],
})
export class UserDashboardPage {
  public subscriptions: Subscription[] = [];
  public user;
  constructor(
    private router: Router, private platform: Platform) {
  }

  ionViewWillEnter() {
    this.user = JSON.parse(localStorage.getItem('currentUserData'));
    const backEvent = this.platform.backButton.subscribe(() => {
      navigator['app'].exitApp();
    });
    this.subscriptions.push(backEvent);
  }

  ionViewDidLeave() {
    this.subscriptions.forEach(subs => subs.unsubscribe());
  }

  public navigate(url) {
    this.router.navigate([url]);
  }

}
