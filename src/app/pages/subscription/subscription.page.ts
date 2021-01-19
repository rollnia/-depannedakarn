import { Component, OnInit } from '@angular/core';
import { Subscription } from "rxjs";
import { LoadingController, AlertController, Platform } from '@ionic/angular';
import { Router, ActivatedRoute } from '@angular/router';
import { ModalController } from '@ionic/angular';
import * as moment from 'moment';
// import { Ionic4DatepickerModalComponent } from 'ionic4-datepicker';
import { AppGetService } from "../../shared/services/app-get.service";

@Component({
  selector: 'app-subscription',
  templateUrl: './subscription.page.html',
  styleUrls: ['./subscription.page.scss'],
})
export class SubscriptionPage implements OnInit {
  public searchProviderData: any;
  dateObj = {
    '1': moment().format('ll'),
    '2': moment().format('ll'),
    '3': moment().format('ll'),
    '4': moment().format('ll')
  };

  datePickerObj1: any = {
    fromDate: moment().format('ll'),
    toDate: new Date('2090-12-31'),
    dateFormat: 'll',
    clearButton: false,
    closeLabel: 'Fermer',
    todayLabel: 'Aujourd\'\hui',
    setLabel: 'Ensemble',
    weeksList: ['D', 'L', 'M', 'M', 'J', 'V', 'S'],
    monthsList: ['janvier', 'février', 'mars', 'avril', 'mai', 'juin', 'juillet', 'août', 'septembre', 'octobre', 'novembre', 'décembre']
  };
  datePickerObj2: any = {
    fromDate: moment().format('ll'),
    toDate: new Date('2090-12-31'),
    dateFormat: 'll',
    clearButton: false,
    closeLabel: 'Fermer',
    todayLabel: 'Aujourd\'\hui',
    setLabel: 'Ensemble',
    weeksList: ['D', 'L', 'M', 'M', 'J', 'V', 'S'],
    monthsList: ['janvier', 'février', 'mars', 'avril', 'mai', 'juin', 'juillet', 'août', 'septembre', 'octobre', 'novembre', 'décembre']
  };
  datePickerObj3: any = {
    fromDate: moment().format('ll'),
    toDate: new Date('2090-12-31'),
    dateFormat: 'll',
    clearButton: false,
    closeLabel: 'Fermer',
    todayLabel: 'Aujourd\'\hui',
    setLabel: 'Ensemble',
    weeksList: ['D', 'L', 'M', 'M', 'J', 'V', 'S'],
    monthsList: ['janvier', 'février', 'mars', 'avril', 'mai', 'juin', 'juillet', 'août', 'septembre', 'octobre', 'novembre', 'décembre']
  };
  datePickerObj4: any = {
    fromDate: moment().format('ll'),
    toDate: new Date('2090-12-31'),
    dateFormat: 'll',
    clearButton: false,
    closeLabel: 'Fermer',
    todayLabel: 'Aujourd\'\hui',
    setLabel: 'Ensemble',
    weeksList: ['D', 'L', 'M', 'M', 'J', 'V', 'S'],
    monthsList: ['janvier', 'février', 'mars', 'avril', 'mai', 'juin', 'juillet', 'août', 'septembre', 'octobre', 'novembre', 'décembre']
  };
  public searchProviderModel = {
    location: '',
    service: ''
  };
  date = (new Date()).toISOString();
  endTime: any = new Date();

  public minDate = (new Date()).toISOString().split('T')[0];

  public subscriptions: Subscription[] = [];
  loading: any;
  return: string = '';
  constructor(private platform: Platform, private appGetService: AppGetService, private route: ActivatedRoute, public loadingController: LoadingController, private router: Router, private alertCtrl: AlertController) {
    this.endTime.setHours(this.endTime.getHours() + 1);
    this.endTime = this.endTime.toISOString();
    const sDate = new Date();
    this.dateObj['2'] = moment(new Date().setDate(new Date().getDate() + 1)).format('ll');
    this.dateObj['3'] = moment(new Date().setDate(new Date().getDate() + 2)).format('ll');
    this.dateObj['4'] = moment(new Date().setDate(new Date().getDate() + 3)).format('ll');
    this.datePickerObj2['fromDate'] = new Date(new Date().setDate(new Date().getDate() + 1));
    this.datePickerObj3['fromDate'] = new Date(new Date().setDate(new Date().getDate() + 2));
    this.datePickerObj4['fromDate'] = new Date(new Date().setDate(new Date().getDate() + 3));
    this.datePickerObj1['toDate'] = new Date(new Date().setDate(new Date().getDate() + 30));
    this.datePickerObj2['toDate'] = new Date(new Date().setDate(new Date().getDate() + 30));
    this.datePickerObj3['toDate'] = new Date(new Date().setDate(new Date().getDate() + 30));
    this.datePickerObj4['toDate'] = new Date(new Date().setDate(new Date().getDate() + 30));
  }

  ngOnInit() {
  }
  ionViewWillEnter() {
    const user = JSON.parse(localStorage.getItem('currentUserData'));
    this.route.queryParams.subscribe(params => {
      this.return = params && params.return ? params.return : '';
    });
    const backEvent = this.platform.backButton.subscribe(() => {
      if ((!user) || (user && !user['token'])) {
        this.router.navigate(['/home']);
      } else if (user['user_type'] === 'client') {
        this.router.navigate(['/user-dashboard']);
      }
    });

    this.subscriptions.push(backEvent);
    this.loadData();
  }

  ionViewDidLeave() {
    this.subscriptions.forEach(subs => subs.unsubscribe());
  }

  private async loadData() {
    this.loading = await this.loadingController.create({
      message: 'Loading please wait',
    });
    this.loading.present();
    const subs = this.appGetService.getSearchData().subscribe(res => {
      if (res?.location && res?.service) {
        this.loading.dismiss();
        this.searchProviderData = res;
        this.searchProviderModel['location'] = this.searchProviderData['location'][0]['id'];
        this.searchProviderModel['service'] = this.searchProviderData['service'][0]['id'];
      }
    }, error => {
      this.loading.dismiss();
      console.error(error);
    });
    this.subscriptions.push(subs);
  }

  public setMinEndDate1(date) {
    const eDate: any = new Date(moment(date)['_d'].setDate(moment(date)['_d'].getDate() + 30));
    const sDate: any = new Date(moment(date)['_d'].setDate(moment(date)['_d'].getDate() + 1));
    this.dateObj['2'] = moment(new Date(moment(date)['_d'].setDate(moment(date)['_d'].getDate() + 1))).format('ll');
    this.dateObj['3'] = moment(new Date(moment(date)['_d'].setDate(moment(date)['_d'].getDate() + 2))).format('ll');
    this.dateObj['4'] = moment(new Date(moment(date)['_d'].setDate(moment(date)['_d'].getDate() + 3))).format('ll');
    this.datePickerObj2['fromDate'] = moment(new Date(moment(date)['_d'].setDate(moment(date)['_d'].getDate() + 1))).format('ll');
    this.datePickerObj3['fromDate'] = moment(new Date(moment(date)['_d'].setDate(moment(date)['_d'].getDate() + 2))).format('ll');
    this.datePickerObj4['fromDate'] = moment(new Date(moment(date)['_d'].setDate(moment(date)['_d'].getDate() + 3))).format('ll');
    this.datePickerObj1['toDate'] = moment(eDate).format('ll');
    this.datePickerObj2['toDate'] = moment(eDate).format('ll');
    this.datePickerObj3['toDate'] = moment(eDate).format('ll');
    this.datePickerObj4['toDate'] = moment(eDate).format('ll');
  }

  public setMinEndDate2(date) {
    const sDate: any = new Date(moment(date)['_d'].setDate(moment(date)['_d'].getDate() + 1));
    this.dateObj['3'] = moment(new Date(moment(date)['_d'].setDate(moment(date)['_d'].getDate() + 1))).format('ll');
    this.dateObj['4'] = moment(new Date(moment(date)['_d'].setDate(moment(date)['_d'].getDate() + 2))).format('ll');
    this.datePickerObj3['fromDate'] = moment(new Date(moment(date)['_d'].setDate(moment(date)['_d'].getDate() + 1))).format('ll');
    this.datePickerObj4['fromDate'] = moment(new Date(moment(date)['_d'].setDate(moment(date)['_d'].getDate() + 2))).format('ll');
  }

  public setMinEndDate3(date) {
    const sDate: any = new Date(moment(date)['_d'].setDate(moment(date)['_d'].getDate() + 1));
    this.dateObj['4'] = moment(sDate).format('ll');
    this.datePickerObj4['fromDate'] = moment(sDate).format('ll');
  }

  public chckTime(sTime, eTime) {
    const time_start: any = new Date();
    const time_end: any = new Date();
    const value_start = sTime.split(':');
    const value_end = eTime.split(':');

    time_start.setHours(value_start[0], value_start[1], value_start[2], 0)
    time_end.setHours(value_end[0], value_end[1], value_end[2], 0)

    const hrs = time_end <= time_start;
    return hrs;
  }

  public async submitSearchData() {
    const params = [];
    const obj = {};
    for (let i = 1; i <= 4; i++) {

      obj['location'] = this.searchProviderModel.location;
      obj['service_type'] = this.searchProviderModel.service;
      obj['selectdate'] = moment(this.mydate1).format('YYYY-MM-DD'); //((<HTMLInputElement>document.getElementById("date")).value).split('T')[0];
      obj['start_time'] = `${new Date((<HTMLInputElement>document.getElementById("startTime")).value).getHours()}:${new Date((<HTMLInputElement>document.getElementById("startTime")).value).getMinutes()}:00`;
      obj['end_time'] = `${new Date((<HTMLInputElement>document.getElementById("endTime")).value).getHours()}:${new Date((<HTMLInputElement>document.getElementById("endTime")).value).getMinutes()}:00`;
      obj['provider_id'] = this.return ? this.return[0] : 0;
    }
  }

}
