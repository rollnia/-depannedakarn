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

  public enableUpdate(index) {
    this.serviceListData[index]['enableEdit'] = true;
  }

  public disableUpdate(index) {
    this.serviceListData[index]['enableEdit'] = false;

    let postParams = {};
    postParams['availability_id'] = this.serviceListData[index]['id'];
    postParams['starttime'] = this.serviceListData[index]['start_time'];
    postParams['endtime'] = this.serviceListData[index]['end_time'];
    this.loadData();
    const subs = this.appPostServicve.updateServiceAvaibility(postParams).subscribe(res => {
      this.serviceList(this.user['user_id']);
      this.loading.dismiss();
    }, error => {
      this.loading.dismiss();
      console.error(error);
    });
    this.subscriptions.push(subs);
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
      if (res && res.availability) {
        this.serviceListData = res.availability;
        if (this.serviceListData.length > 0) {
          this.serviceListData.forEach((element, index) => {
            this.serviceListData[index]['enableEdit'] = false;
            this.serviceListData[index]['index'] = index;
          });
        }
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
