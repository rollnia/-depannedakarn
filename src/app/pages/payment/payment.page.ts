import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-payment',
  templateUrl: './payment.page.html',
  styleUrls: ['./payment.page.scss'],
})
export class PaymentPage implements OnInit {
  currencyIcon = '$';
  paymentAmount = '3000';
  constructor() { }

  ngOnInit() {
  }

}
