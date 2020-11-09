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
  currency = 'INR';
  paymentAmount = '3000';
  constructor(private platform: Platform, private payPal: PayPal, private route: ActivatedRoute, private router: Router) { }

  ngOnInit() {
    const user = JSON.parse(localStorage.getItem('currentUserData'));
    this.platform.backButton.subscribeWithPriority(13, () => {
      this.router.navigate(['/searchprovider']);
    });
    this.route.queryParams.subscribe(params => {
      this.paymentAmount = JSON.parse(params.return) || '';
    });
  }

  payWithPaypal() {

    // PayPalEnvironmentProduction: 'YOUR_PRODUCTION_CLIENT_ID',
    this.payPal.init({
      PayPalEnvironmentProduction: 'YOUR_PRODUCTION_CLIENT_ID',
      PayPalEnvironmentSandbox: 'AYS9xxDvHwHzhBYx3hez8khFhYblfWVat_t_5c_JyJstv1kCFFoON3-kAH6M'
    }).then(() => {
      // Environments: PayPalEnvironmentNoNetwork, PayPalEnvironmentSandbox, PayPalEnvironmentProduction
      this.payPal.prepareToRender('PayPalEnvironmentSandbox', new PayPalConfiguration({
        // Only needed if you get an "Internal Service Error" after PayPal login!
        //payPalShippingAddressOption: 2 // PayPalShippingAddressOptionPayPal
      })).then(() => {
        let payment = new PayPalPayment(this.paymentAmount, this.currency, 'Description', 'sale');
        this.payPal.renderSinglePaymentUI(payment).then((res) => {
          alert(res);
          alert('done');
          // Successfully paid
        }, (error) => {
          alert('Error or render dialog closed without being successful');
          alert(error);
          // Error or render dialog closed without being successful
        });
      }, () => {
        alert('Config Error');
        // Error in configuration
      });
    }, () => {
      alert('PayPal isnot supported or something else');
      // Error in initialization, maybe PayPal isn't supported or something else
    });
  }

}
