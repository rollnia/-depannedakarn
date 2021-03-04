import { Component, OnInit } from '@angular/core';
import { Subscription } from "rxjs";
import { LoadingController, AlertController, Platform } from '@ionic/angular';
import { Router, ActivatedRoute } from '@angular/router';
import { AppGetService } from "../../shared/services/app-get.service";
import * as moment from 'moment';

@Component({
  selector: 'app-demand-in-progress',
  templateUrl: './demand-in-progress.page.html',
  styleUrls: ['./demand-in-progress.page.scss'],
})
export class DemandInProgressPage {
  public subscriptions: Subscription[] = [];
  public bookingprogressData = [];
  public messmissionCmpleted = [];
  public user;
  loading: any;
  return: string = '';
  constructor(private platform: Platform, private appGetService: AppGetService, private route: ActivatedRoute, public loadingController: LoadingController, private router: Router, private alertCtrl: AlertController) { }

  ionViewDidLeave() {
    this.subscriptions.forEach(subs => subs.unsubscribe());
  }

  ionViewWillEnter() {
    this.user = JSON.parse(localStorage.getItem('currentUserData'));
    const backEvent = this.platform.backButton.subscribe(() => {
      if (this.user && this.user['user_type'] === 'client') {
        this.router.navigate(['/user-dashboard']);
      } else if (this.user && this.user['user_type'] === 'provider') {
        this.router.navigate(['/service-providor-dashboard']);
      } else {
        this.router.navigate(['/home']);
      }
    });
    this.subscriptions.push(backEvent);
    this.loadData();
  }

  private async loadData() {
    this.loading = await this.loadingController.create({
      message: 'Chargement en cours',
    });
    this.loading.present();
    const user = JSON.parse(localStorage.getItem('currentUserData'));
    this.loadProgressData(user['user_id'], user['user_type']);
  }

  private loadProgressData(id, userType) {
    if (userType === 'provider') {
      this.providerData(id);
    } else {
      this.clientData(id);
    }

  }

  private providerData(id) {
    const subs = this.appGetService.getMisMission(id).subscribe(res => {
      if (res?.messmission) {
        this.bookingprogressData = res.messmission;
      }
      this.loading.dismiss();
    }, error => {
      this.loading.dismiss();
      console.error(error);
    });
    this.subscriptions.push(subs);
  }

  private clientData(id) {
    const subs = this.appGetService.getDemandProgress(id).subscribe(res => {
      if (res?.bookingprogress) {
        this.bookingprogressData = res.bookingprogress;
      }
      this.loading.dismiss();
    }, error => {
      this.loading.dismiss();
      console.error(error);
    });
    this.subscriptions.push(subs);
  }

  private async loadCompleteMission() {
    this.loading = await this.loadingController.create({
      message: 'Chargement en cours',
    });
    this.loading.present();
    const user = JSON.parse(localStorage.getItem('currentUserData'));
    const subs = this.appGetService.getCompleteMission(user['user_id']).subscribe(res => {
      if (res?.messmission) {
        this.messmissionCmpleted = res.messmission;
      }
      this.loading.dismiss();
    }, error => {
      this.loading.dismiss();
      console.error(error);
    });
    this.subscriptions.push(subs);
  }

  public onSelect(evt) {
    if (evt.id == 1) {
      this.loadData();
    } else if (evt.id == 2) {
      this.loadCompleteMission();
    }
  }

  /**
   * getDetails
   */
  public getDetails(id) {
    let params = [];
    const user = JSON.parse(localStorage.getItem('currentUserData'));
    if (user['user_type'] === 'provider') {
      params = [id, 'history', 'provider'];
    } else {
      params = [id];
    }

    this.router.navigate(['/bookingdetail'], {
      queryParams: {
        return: params
      }
    });
  }

  public getDateFormat(date) {
    const formatDate = moment(moment(date)['_d']).locale('fr').format('ll');
    return formatDate;
  }

  public getCompletedDetails(id) {
    const params = [id, 'completed', 'provider', 'view'];
    this.router.navigate(['/bookingdetail'], {
      queryParams: {
        return: params
      }
    });
  }

}
