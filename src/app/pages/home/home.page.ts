import { Component, OnInit } from '@angular/core';
import { Platform } from '@ionic/angular';
import { Router } from '@angular/router';
@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {

  constructor(
    private platform: Platform, private router: Router) {
    this.platform.backButton.subscribeWithPriority(10, () => {
      navigator['app'].exitApp();
    });
  }

  ngOnInit() {
    const user = JSON.parse(localStorage.getItem('currentUserData'));
    if (!user) {
    } else if (user && user['token']) {
      if (user['user_type'] === 'client') {
        this.router.navigate(['/user-dashboard']);
      } else {
        this.router.navigate(['/service-providor-dashboard']);
      }
    }
  }

}
