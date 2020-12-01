import { Component, OnInit } from '@angular/core';
import { LoadingController, Platform } from '@ionic/angular';
import { Router } from '@angular/router';
import { Subscription } from "rxjs";
import { AppGetService } from "../../shared/services/app-get.service";

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage {
  public subscriptions: Subscription[] = [];
  loading: any;
  constructor(private platform: Platform, private router: Router, private appGetService: AppGetService, public loadingController: LoadingController) {

  }

  ionViewWillEnter() {
    const backEvent = this.platform.backButton.subscribe(() => {
      navigator['app'].exitApp();
    });
    this.subscriptions.push(backEvent);
    this.load();
    // if (!user) {
    // } else if (user && user['token']) {
    //   if (user['user_type'] === 'client') {
    //     this.router.navigate(['/user-dashboard']);
    //   } else {
    //     this.router.navigate(['/service-providor-dashboard']);
    //   }
    // }
  }

  private async load() {
    this.loading = await this.loadingController.create({
      message: 'Loading please wait',
    });
    this.loading.present();
    const user = JSON.parse(localStorage.getItem('currentUserData'));
    const subs = this.appGetService.userType().subscribe(res => {
      if (res?.user_type) {
        if (user['user_type'] === 'client') {
          this.router.navigate(['/user-dashboard']);
        } else {
          this.router.navigate(['/service-providor-dashboard']);
        }
      }
      this.loading.dismiss();
    }, error => {
      this.loading.dismiss();
      console.error(error);
    });
    this.subscriptions.push(subs);
  }

  ionViewDidLeave() {
    this.subscriptions.forEach(subs => subs.unsubscribe());
  }

}
