import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';
import { BitPaymentPageRoutingModule } from './bit-payment-routing.module';
import { NgxQRCodeModule } from '@techiediaries/ngx-qrcode';
import { BitPaymentPage } from './bit-payment.page';
import { ClipboardModule } from 'ngx-clipboard';


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    BitPaymentPageRoutingModule,
    NgxQRCodeModule,
    ClipboardModule
  ],
  declarations: [BitPaymentPage]
})
export class BitPaymentPageModule { }
