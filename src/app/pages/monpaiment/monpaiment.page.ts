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
  starDate;
  endDate;
  datePickerObj: any = {};
  datePickerObj1: any = {};
  public subscriptions: Subscription[] = [];
  loading: any;
  public date = new Date();
  public maxDate = this.date.toISOString();
  public toDate = this.date.toISOString();
  public fromDate: any = new Date();
  public minEndDate: any = new Date();
  public paymentDetails = [];
  public totalBalance = '';
  constructor(private platform: Platform, private appGetService: AppGetService, private route: ActivatedRoute, public loadingController: LoadingController, private router: Router, private alertCtrl: AlertController) {
    const eDate: any = new Date(this.date.setDate(this.date.getDate() - 30));
    this.fromDate = eDate.toISOString();
    this.minEndDate = this.fromDate;
    this.starDate = moment(eDate).format('ll');
    this.endDate = moment().format('ll');
    this.datePickerObj = {
      toDate: moment().format('ll'),
      dateFormat: 'll',
      clearButton: false,
    };
    this.datePickerObj1 = {
      fromDate: this.starDate,
      toDate: moment().format('ll'),
      dateFormat: 'll',
      clearButton: false,
    };
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

  public setMinEndDate(date) {
    this.datePickerObj1['fromDate'] = moment(date).format('ll');
  }

  public async loadPaymentData() {
    const user = JSON.parse(localStorage.getItem('currentUserData'));
    const params = {};
    params['from_date'] = moment(this.starDate).format('YYYY-MM-DD');//((<HTMLInputElement>document.getElementById("startDate")).value).split('T')[0];
    params['to_date'] = moment(this.endDate).format('YYYY-MM-DD');//((<HTMLInputElement>document.getElementById("endDate")).value).split('T')[0];
    params['providerid'] = user['user_id'];
    if (params['from_date'] > params['to_date']) {
      this.appGetService.showToast('Start Date must be less than End Date');
      return;
    }
    this.loading = await this.loadingController.create({
      message: 'Loading please wait',
    });
    this.loading.present();
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
