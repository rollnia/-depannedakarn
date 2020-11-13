import { Component, OnInit } from '@angular/core';
import { LoadingController } from '@ionic/angular';
import { Subscription } from "rxjs";
import { Router } from '@angular/router';

import { AppGetService } from "../../shared/services/app-get.service";

@Component({
  selector: 'app-payment-success',
  templateUrl: './payment-success.page.html',
  styleUrls: ['./payment-success.page.scss'],
})
export class PaymentSuccessPage implements OnInit {
  public subscriptions: Subscription[] = [];
  loading: any;
  constructor(private router: Router, private appGetService: AppGetService, public loadingController: LoadingController) { }

  ngOnInit() {
  }

  ionViewDidLeave() {
    this.subscriptions.forEach(subs => subs.unsubscribe());
  }

  public async update(evt) {
    this.loading = await this.loadingController.create({
      message: 'Loading please wait',
    });
    this.loading.present();
    const subs = this.appGetService.logoutUser().subscribe(res => {
      if (res?.message) {
        this.loading.dismiss();
        localStorage.removeItem('currentUserData');
        this.router.navigate(['/home']);
      }
    }, error => {
      this.loading.dismiss();
      console.error(error);
    });
    this.subscriptions.push(subs);
  }

}
