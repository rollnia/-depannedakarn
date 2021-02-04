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
  goBack: boolean = false;
  public subsPaymentData;
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
    const subs = this.appGetService.subscriptionData.subscribe(data => {
      this.subsPaymentData = data;
      console.log(this.subsPaymentData);
    });
    this.subscriptions.push(subs);
  }

  ionViewDidLeave() {
    this.subscriptions.forEach(subs => subs.unsubscribe());
  }

  private async loadInvoice() {
    this.loading = await this.loadingController.create({
      message: 'Chargement en cours',
    });
    this.loading.present();
    let user = JSON.parse(localStorage.getItem('currentUserData'));
    let amt = this.paymentData[0];
    let paymentType = 'single';
    let booking = [];

    booking.push({
      amount: this.paymentData[0],
      user_id: user['user_id'],
      service_id: user['service_id'],
      location_id: user['location_id'],
      provider_id: this.paymentData[4],
      booking_date: this.paymentData[1],
      start_time: this.paymentData[2],
      end_time: this.paymentData[3],
      booking_status: 'success',
      payment_status: 'success',
      payment_method: 'bitpay',
      total_hrs: this.paymentData[5]
    });
    if (this.subsPaymentData) {
      booking = [];
      amt = this.getSusbcriptionAmount();
      paymentType = 'subscribe';
      this.subsPaymentData.forEach(ele => {
        let tempObj = {};
        tempObj['user_id'] = user['user_id'];
        tempObj['provider_id'] = ele.id;
        tempObj['booking_status'] = 'pending';
        tempObj['service_id'] = user['service_id'];
        tempObj['location_id'] = user['location_id'];
        tempObj['total_hrs'] = ele.hrs;
        tempObj['booking_date'] = ele.bookingdate;
        tempObj['start_time'] = ele.start_time;
        tempObj['end_time'] = ele.end_time;
        tempObj['amount'] = parseInt(ele.amt);
        booking.push(tempObj);
      });
    }
    let payload = {
      payment_type: paymentType,
      tot_amount: parseInt(amt),
      client: user.user_name,
      email: user.user_email,
      booking: booking
    };
    const subs = this.appPostServie.makeBitcoinPayment(payload).subscribe(res => {
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

  public getSusbcriptionAmount() {
    let amt = 0;
    this.subsPaymentData.forEach(ele => {
      amt = amt + ele.amt;
    });
    return amt;
  }

  public tiomoutQrCode() {
    setTimeout(() => {
      this.goBack = true;
    }, 900000);
  }

  public goBackSearch() {
    this.router.navigate(['/searchprovider']);
  }

  private checkPaymentStatus(invoiceid) {
    this.tiomoutQrCode();
    const subs = this.appGetService.checkStatus(invoiceid).subscribe(res => {
      if (res?.invoice && res.invoice === 'confirmed') {
        this.router.navigate(['/payment-success']);
        // this.navigateToSuceess(invoiceid, 'bitpay');
      } else {
        this.checkPaymentStatus(invoiceid);
      }
      this.loading.dismiss();
    }, error => {
      this.loading.dismiss();
      console.error(error);
    });
  }
}
