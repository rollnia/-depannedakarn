import { Component, OnInit } from '@angular/core';
import { Platform } from '@ionic/angular';
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
  constructor(
    private platform: Platform, private router: Router, private appGetService: AppGetService) {
  }

  ionViewDidEnter() {
    
  }

  ionViewWillEnter() {
    const backEvent = this.platform.backButton.subscribe(() => {
      navigator['app'].exitApp();
    });
    this.subscriptions.push(backEvent);
    const user = JSON.parse(localStorage.getItem('currentUserData'));
    // const subs = this.appGetService.userType().subscribe(res => {
    //   if (res?.user_type) {

    //   }
    // }, error => {
    // });
    // this.subscriptions.push(subs);
    if (!user) {
    } else if (user && user['token']) {
      if (user['user_type'] === 'client') {
        this.router.navigate(['/user-dashboard']);
      } else {
        this.router.navigate(['/service-providor-dashboard']);
      }
    }
    // this.subscriptions.push(subs);
  }

  ionViewDidLeave() {
    this.subscriptions.forEach(subs => subs.unsubscribe());
  }

}
