import { Component, OnInit } from '@angular/core';
import { Platform } from '@ionic/angular';
import { Router } from '@angular/router';

@Component({
  selector: 'app-user-dashboard',
  templateUrl: './user-dashboard.page.html',
  styleUrls: ['./user-dashboard.page.scss'],
})
export class UserDashboardPage {

  constructor(
    private router: Router, private platform: Platform) {
  }

  ionViewDidEnter() {
    this.platform.backButton.subscribeWithPriority(10, () => {
      navigator['app'].exitApp();
    });
  }

  public navigate() {
    this.router.navigate(['/searchprovider']);
  }

}
