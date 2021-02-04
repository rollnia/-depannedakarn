import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { LoadingController, AlertController, Platform } from '@ionic/angular';
import { AppGetService } from "../../shared/services/app-get.service";
@Component({
  selector: 'app-user-dashboard',
  templateUrl: './user-dashboard.page.html',
  styleUrls: ['./user-dashboard.page.scss'],
})
export class UserDashboardPage {
  public subscriptions: Subscription[] = [];
  public user;
  loading;
  constructor(
    private router: Router, private platform: Platform, private appGetService: AppGetService, public loadingController: LoadingController) {
  }

  ionViewWillEnter() {
    this.user = JSON.parse(localStorage.getItem('currentUserData'));
    const backEvent = this.platform.backButton.subscribe(() => {
      navigator['app'].exitApp();
    });
    this.subscriptions.push(backEvent);
    this.getUserType();
  }

  ionViewDidLeave() {
    this.subscriptions.forEach(subs => subs.unsubscribe());
  }

  public navigate(url) {
    this.router.navigate([url]);
  }

  private async getUserType() {
    this.loading = await this.loadingController.create({
      message: 'Loading please wait',
      duration: 20000
    });
    this.loading.present();
    const subs = this.appGetService.userType().subscribe(res => {
      if (res?.user && res.user?.user_type) {
        this.user = JSON.parse(localStorage.getItem('currentUserData'));
        this.user['cust_id'] = res['user']['cust_id'];
        this.user['subscription'] = res['subscription'];
        localStorage.setItem('currentUserData', JSON.stringify(this.user));
        this.loading.dismiss();
      }
    }, error => {
      this.loading.dismiss();
      console.error(error);
    });
    this.subscriptions.push(subs);
  }

}
