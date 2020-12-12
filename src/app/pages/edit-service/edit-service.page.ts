import { Component, OnInit } from '@angular/core';
import { LoadingController } from '@ionic/angular';
import { Subscription } from 'rxjs';
import { AppGetService } from 'src/app/shared/services/app-get.service';
import { AppPostService } from 'src/app/shared/services/app-post.service';

@Component({
  selector: 'app-edit-service',
  templateUrl: './edit-service.page.html',
  styleUrls: ['./edit-service.page.scss'],
})
export class EditServicePage implements OnInit {

  public user: any;
  loading: any;
  public subscriptions: Subscription[] = [];
  public serviceListData: any;

  constructor(private appGetService: AppGetService, public loadingController: LoadingController, private appPostServicve: AppPostService) { }

  ngOnInit() {
  }

  ionViewDidLeave() {
    this.subscriptions.forEach(subs => subs.unsubscribe());
  }

  ionViewWillEnter() {
    this.user = JSON.parse(localStorage.getItem('currentUserData'));

    this.serviceList(this.user['user_id']);

    //getItem('currentUserData'));
  }

  private async loadData() {
    this.loading = await this.loadingController.create({
      message: 'Loading please wait',
    });
    this.loading.present();
  }

  private serviceList(id) {
    this.loadData();
    const subs = this.appGetService.getServiceList(id).subscribe(res => {
      console.log('===>>', res);
      if (res && res.availability) {
        this.serviceListData = res.availability;
      }
      this.loading.dismiss();
    }, error => {
      this.loading.dismiss();
      console.error(error);
    });
    this.subscriptions.push(subs);
  }

  public update(availability_id, status) {
    let paramData: any = {};
    paramData['availability_id'] = availability_id;
    paramData['is_available'] = status == '1' ? 0 : 1;
    this.loadData();
    const subs = this.appPostServicve.updateAvaibility(paramData).subscribe(res => {
      this.serviceList(this.user['user_id']);
      this.loading.dismiss();
    }, error => {
      this.loading.dismiss();
      console.error(error);
    });
    this.subscriptions.push(subs);
  }

}
