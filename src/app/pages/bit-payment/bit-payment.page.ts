import { Component, OnInit } from '@angular/core';
import { LoadingController, Platform } from '@ionic/angular';
import { Router, ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { ClipboardService } from 'ngx-clipboard';
import { AppPostService } from "../../shared/services/app-post.service";
import { AppGetService } from "../../shared/services/app-get.service";

@Component({
  selector: 'app-bit-payment',
  templateUrl: './bit-payment.page.html',
  styleUrls: ['./bit-payment.page.scss'],
})
export class BitPaymentPage implements OnInit {
  paymentData;
  loading: any;
  value;
  public subscriptions: Subscription[] = [];
  constructor(private clipboard: ClipboardService, private appGetService: AppGetService, private appPostServie: AppPostService, public loadingController: LoadingController, private platform: Platform, private route: ActivatedRoute, private router: Router) {
    this.route.queryParams.subscribe(params => {
      this.paymentData = params.return || '';
    });
  }

  ngOnInit() {
  }

  copyText(inputElement) {
    this.clipboard.copyFromContent(this.value);
    this.copied = true;
    this.appGetService.showToast('Text Copied!!');
  }

  ionViewWillEnter() {

    const backEvent = this.platform.backButton.subscribe(() => {
      this.router.navigate(['/user-dashboard']);
    });
    this.subscriptions.push(backEvent);

  }

  ionViewDidEnter() {
    this.loadInvoice();
  }

  ionViewDidLeave() {
    this.subscriptions.forEach(subs => subs.unsubscribe());
  }

  private async loadInvoice() {
    this.loading = await this.loadingController.create({
      message: 'Loading please wait',
    });
    this.loading.present();

    let payload = {};
    let userData = JSON.parse(localStorage.getItem('currentUserData'));
    payload['client'] = userData.user_name;
    payload['email'] = userData.user_email;
    payload['amount'] = this.paymentData[0];
    const subs = this.appPostServie.makeBitcoinPayment(payload).subscribe(res => {
      console.log('==>>>', res);
      if (res?.invoiceid) {
        this.value = `https://test.bitpay.com/i/${res.invoiceid}`;
        this.checkPaymentStatus(res.invoiceid);
      }
      this.loading.dismiss();
    }, error => {
      this.loading.dismiss();
      console.error(error);
    });
    this.subscriptions.push(subs);
  }

  private checkPaymentStatus(invoiceid) {
    const subs = this.appGetService.checkStatus(invoiceid).subscribe(res => {
      if (res?.confirm && res.confirm?.status === 'succeeded') {
        this.navigateToSuceess(invoiceid, 'bitpay');
      } else {
        this.checkPaymentStatus(invoiceid);
      }
      this.loading.dismiss();
    }, error => {
      this.loading.dismiss();
      console.error(error);
    });
  }

  public async navigateToSuceess(tranID, type) {
    this.loading = await this.loadingController.create({
      message: 'Loading please wait',
    });
    this.loading.present();
    const user = JSON.parse(localStorage.getItem('currentUserData'));
    const params = {
      user_id: user['user_id'],
      service_id: user['service_id'],
      location_id: user['location_id'],
      provider_id: this.paymentData[4],
      transaction_id: tranID,
      booking_date: this.paymentData[1],
      start_time: this.paymentData[2],
      end_time: this.paymentData[3],
      booking_status: 'pending',
      total_hrs: this.paymentData[5],
      amount: parseInt(this.paymentData[0]),
      payment_status: 'success',
      payment_method: type
    };
    const subs = this.appPostServie.paymentSuccess(params).subscribe(res => {
      if (res?.message) {
        // this.loading.dismiss();
        this.router.navigate(['/payment-success']);
      }
      this.loading.dismiss();
    }, error => {
      this.loading.dismiss();
      console.error(error);
    });
    this.subscriptions.push(subs);
  }

}
