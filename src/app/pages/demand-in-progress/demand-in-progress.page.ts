import { Component, OnInit } from '@angular/core';
import { Subscription } from "rxjs";
import { LoadingController, AlertController, Platform } from '@ionic/angular';
import { Router, ActivatedRoute } from '@angular/router';
import { AppGetService } from "../../shared/services/app-get.service";

@Component({
  selector: 'app-demand-in-progress',
  templateUrl: './demand-in-progress.page.html',
  styleUrls: ['./demand-in-progress.page.scss'],
})
export class DemandInProgressPage implements OnInit {
  public subscriptions: Subscription[] = [];
  public bookingprogressData = [];
  loading: any;
  return: string = '';
  constructor(private platform: Platform, private appGetService: AppGetService, private route: ActivatedRoute, public loadingController: LoadingController, private router: Router, private alertCtrl: AlertController) { }

  ngOnInit() {
  }

  ionViewDidLeave() {
    this.subscriptions.forEach(subs => subs.unsubscribe());
  }

  ionViewWillEnter() {
    const user = JSON.parse(localStorage.getItem('currentUserData'));
    const backEvent = this.platform.backButton.subscribe(() => {
      if (!user) {
        this.router.navigate(['/home']);
      } else if (user['user_type'] === 'client') {
        this.router.navigate(['/user-dashboard']);
      } else if (user['user_type'] === 'provider') {
        this.router.navigate(['/service-providor-dashboard']);
      }
    });
    this.subscriptions.push(backEvent);
    this.loadData();
  }

  private async loadData() {
    this.loading = await this.loadingController.create({
      message: 'Loading please wait',
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

  /**
   * getDetails
   */
  public getDetails(id) {
    const params = [id, 'history', 'provider'];
    this.router.navigate(['/bookingdetail'], {
      queryParams: {
        return: params
      }
    });
  }

}
