import { Component, OnInit } from '@angular/core';
import { PayPal, PayPalPayment, PayPalConfiguration } from '@ionic-native/paypal/ngx';
import { Router, ActivatedRoute } from '@angular/router';
import { LoadingController, Platform } from '@ionic/angular';
import { AppPostService } from "../../shared/services/app-post.service";
import { Subscription } from 'rxjs';
import { AppGetService } from "../../shared/services/app-get.service";
@Component({
  selector: 'app-payment',
  templateUrl: './payment.page.html',
  styleUrls: ['./payment.page.scss'],
})
export class PaymentPage implements OnInit {
  currencyIcon = '$';
  currency = 'USD';
  paymentData;
  paymentOption = "existingCard";
  existingCardDetails;
  month = ['janvier', 'février', 'mars', 'avril', 'mai', 'juin', 'juillet', 'août', 'septembre', 'octobre', 'novembre', 'décembre'];
  public subscriptions: Subscription[] = [];
  paypalResponse = '';
  loading: any;
  constructor(private appGetService: AppGetService, private appPostService: AppPostService, public loadingController: LoadingController, private platform: Platform, private payPal: PayPal, private route: ActivatedRoute, private router: Router) {
    this.route.queryParams.subscribe(params => {
      this.paymentData = params.return || '';
    });
  }

  ngOnInit() {

  }

  ionViewDidEnter() {
    this.loadExistingCard();
  }

  ionViewWillEnter() {

    const backEvent = this.platform.backButton.subscribe(() => {
      this.router.navigate(['/searchprovider']);
    });
    this.subscriptions.push(backEvent);

  }

  ionViewDidLeave() {
    this.subscriptions.forEach(subs => subs.unsubscribe());
  }

  private async loadExistingCard() {
    this.loading = await this.loadingController.create({
      message: 'Loading please wait',
    });
    this.loading.present();
    const user = JSON.parse(localStorage.getItem('currentUserData'));
    const subs = this.appGetService.getCardDetails(user['cust_id']).subscribe(res => {
      if (res?.getallcard && res.getallcard?.data && res.getallcard.data.length) {
        this.existingCardDetails = res['getallcard']['data'];
        this.paymentOption = res['getallcard']['data'][0]['id'];
      }
      this.loading.dismiss();
    }, error => {
      this.loading.dismiss();
      console.error(error);
    });
    this.subscriptions.push(subs);
  }

  public getMaymentDetails(evt) {
    console.log(this.paymentOption);
    if (this.paymentOption === 'paypal') {
      this.payWithPaypal();
    } else if (this.paymentOption === 'newCard') {
      this.newCardayment();
    } else {
      this.existingCard(this.paymentOption);
    }
  }

  public existingCard(paymentOption) {

  }

  public newCardayment() {

  }

  payWithPaypal() {
    // this.navigateToSuceess('PAY-1AB23456CD789012EF34GHIJ');
    // PayPalEnvironmentProduction: 'YOUR_PRODUCTION_CLIENT_ID',
    this.payPal.init({
      PayPalEnvironmentProduction: '',
      //PayPalEnvironmentSandbox: 'AYS9xxDvHwHzhBYx3hez8khFhYblfWVat_t_5c_JyJstv1kCFFoON3-kAH6M'
      PayPalEnvironmentSandbox: 'AX78MZSmLxkyM0QEgOQLtgbWSKr8s9jlXS2K8MCufNnGTqfRZ78Q_zDwTYcd4ysyY7Dm6gsHib5Ys5HB'
    }).then(() => {
      // Environments: PayPalEnvironmentNoNetwork, PayPalEnvironmentSandbox, PayPalEnvironmentProduction
      this.payPal.prepareToRender('PayPalEnvironmentSandbox', new PayPalConfiguration({
        // Only needed if you get an "Internal Service Error" after PayPal login!
        //payPalShippingAddressOption: 2 // PayPalShippingAddressOptionPayPal
      })).then(() => {
        let payment = new PayPalPayment(this.paymentData[0], this.currency, 'Description', 'sale');
        this.payPal.renderSinglePaymentUI(payment).then((res) => {
          // alert('Payment Successfully paid');
          this.paypalResponse = res;
          this.navigateToSuceess(res.response.id);

          // Successfully paid
          // Example sandbox response
          //
          // {
          //   "client": {
          //     "environment": "sandbox",
          //     "product_name": "PayPal iOS SDK",
          //     "paypal_sdk_version": "2.16.0",
          //     "platform": "iOS"
          //   },
          //   "response_type": "payment",
          //   "response": {
          //     "id": "PAY-1AB23456CD789012EF34GHIJ",
          //     "state": "approved",
          //     "create_time": "2016-10-03T13:33:33Z",
          //     "intent": "sale"
          //   }
          // }
        }, (error) => {
          alert(error);
          // Error or render dialog closed without being successful
        });
      }, () => {
        alert('Config Error');
        // Error in configuration
      });
    }, () => {
      alert('PayPal is not supported or something else');
      // Error in initialization, maybe PayPal isn't supported or something else
    });
  }

  public async navigateToSuceess(tranID) {
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
      payment_method: 'paypal'
    };
    const subs = this.appPostService.paymentSuccess(params).subscribe(res => {
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
