import { Component, OnInit } from '@angular/core';
import { Subscription } from "rxjs";
import { LoadingController, AlertController, Platform } from '@ionic/angular';
import { Router, ActivatedRoute } from '@angular/router';
import * as moment from 'moment';

import { AppGetService } from "../../shared/services/app-get.service";
@Component({
  selector: 'app-monpaiment',
  templateUrl: './monpaiment.page.html',
  styleUrls: ['./monpaiment.page.scss'],
})
export class MonpaimentPage {
  public subscriptions: Subscription[] = [];
  loading: any;
  public date = new Date();
  public fromDate = this.date.toISOString();
  public toDate: any = new Date();
  public minEndDate: any = new Date();
  public paymentDetails = [];
  public totalBalance = '';
  constructor(private platform: Platform, private appGetService: AppGetService, private route: ActivatedRoute, public loadingController: LoadingController, private router: Router, private alertCtrl: AlertController) {
    const eDate: any = new Date(this.date.setDate(this.date.getDate() + 30));
    const minDate: any = new Date(new Date().setDate(new Date().getDate() + 1));
    this.toDate = eDate.toISOString();
    this.minEndDate = minDate.toISOString();
  }

  ngOnInit() {
  }

  ionViewWillEnter() {
    const backEvent = this.platform.backButton.subscribe(() => {
      this.router.navigate(['/service-providor-dashboard']);
    });
    this.subscriptions.push(backEvent);
  }

  ionViewDidLeave() {
    this.subscriptions.forEach(subs => subs.unsubscribe());
  }

  public setMinEndDate() {
    const starDate = new Date(((<HTMLInputElement>document.getElementById("startDate")).value).split('T')[0]);
    const minDate: any = new Date(starDate.setDate(starDate.getDate() + 1));
    this.minEndDate = minDate.toISOString();
  }

  public async loadPaymentData() {
    const user = JSON.parse(localStorage.getItem('currentUserData'));
    this.loading = await this.loadingController.create({
      message: 'Loading please wait',
    });
    this.loading.present();
    const params = {};
    params['from_date'] = ((<HTMLInputElement>document.getElementById("startDate")).value).split('T')[0];
    params['to_date'] = ((<HTMLInputElement>document.getElementById("endDate")).value).split('T')[0];
    params['providerid'] = user['user_id'];
    const subs = this.appGetService.myPayment(params).subscribe(res => {
      if (res?.paimentdetails) {
        this.loading.dismiss();
        this.paymentDetails = res.paimentdetails;
        this.totalBalance = res.totbalance;
      }

    }, error => {
      this.loading.dismiss();
      console.error(error);
    });
    this.subscriptions.push(subs);
  }

  public getPaidStatus(status) {
    if (status && status.toLowerCase() === 'paid') {
      return 'Withdrawn';
    } else {
      return 'Not Withdrawn';
    }
  }

  public transactionDetails(id) {
    const params = [id, 'payment', 'provider', 'view'];
    this.router.navigate(['/bookingdetail'], {
      queryParams: {
        return: params
      }
    });
  }

  public getDateFormat(date) {
    const formatDate = moment(moment(date)['_d']).format('ll');
    return formatDate;
  }

}
