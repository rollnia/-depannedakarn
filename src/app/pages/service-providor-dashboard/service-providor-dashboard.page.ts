import { Component, OnInit } from '@angular/core';
import { Platform } from '@ionic/angular';
@Component({
  selector: 'app-service-providor-dashboard',
  templateUrl: './service-providor-dashboard.page.html',
  styleUrls: ['./service-providor-dashboard.page.scss'],
})
export class ServiceProvidorDashboardPage implements OnInit {

  constructor(
    private platform: Platform) {
    this.platform.backButton.subscribeWithPriority(10, () => {
      navigator['app'].exitApp();
    });
  }

  ngOnInit() {
  }

}
