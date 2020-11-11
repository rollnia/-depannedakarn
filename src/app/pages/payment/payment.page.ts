import { Component, OnInit } from '@angular/core';
import { PayPal, PayPalPayment, PayPalConfiguration } from '@ionic-native/paypal/ngx';
import { Router, ActivatedRoute } from '@angular/router';
import { Platform } from '@ionic/angular';
@Component({
  selector: 'app-payment',
  templateUrl: './payment.page.html',
  styleUrls: ['./payment.page.scss'],
})
export class PaymentPage implements OnInit {
  currencyIcon = '$';
  currency = 'USD';
  paymentAmount = '3000';
  paypalResponse = '';
  navigate: string = '';
  constructor(private platform: Platform, private payPal: PayPal, private route: ActivatedRoute, private router: Router) {
    const user = JSON.parse(localStorage.getItem('currentUserData'));
  }

  ngOnInit() {

    this.platform.backButton.subscribeWithPriority(11, () => {
      this.router.navigate(['/searchprovider']);
    });

    this.route.queryParams.subscribe(params => {
      this.paymentAmount = JSON.parse(params.return) || '';
    });

  }

  payWithPaypal() {
    this.navigate = '';
    // PayPalEnvironmentProduction: 'YOUR_PRODUCTION_CLIENT_ID',
    this.payPal.init({
      PayPalEnvironmentProduction: '',
      PayPalEnvironmentSandbox: 'AYS9xxDvHwHzhBYx3hez8khFhYblfWVat_t_5c_JyJstv1kCFFoON3-kAH6M'
    }).then(() => {
      // Environments: PayPalEnvironmentNoNetwork, PayPalEnvironmentSandbox, PayPalEnvironmentProduction
      this.payPal.prepareToRender('PayPalEnvironmentSandbox', new PayPalConfiguration({
        // Only needed if you get an "Internal Service Error" after PayPal login!
        //payPalShippingAddressOption: 2 // PayPalShippingAddressOptionPayPal
      })).then(() => {
        let payment = new PayPalPayment(this.paymentAmount, this.currency, 'Description', 'sale');
        this.payPal.renderSinglePaymentUI(payment).then((res) => {
          alert('Payment Successfully paid');
          this.paypalResponse = res;
          this.navigate = 'paid';
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
    this.navigateToSucess();
  }

  private navigateToSucess() {
    const interval = setInterval(() => {
      if (this.navigate) {
        this.router.navigate(['/payment-succes']);
        clearInterval(interval);
      }
    }, 1000);
  }

}
