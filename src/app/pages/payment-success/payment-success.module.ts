import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { PaymentSuccessPageRoutingModule } from './payment-success-routing.module';

import { PaymentSuccessPage } from './payment-success.page';
import { HeaderPageModule } from "../header/header.module";
@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    PaymentSuccessPageRoutingModule,
    HeaderPageModule
  ],
  declarations: [PaymentSuccessPage]
})
export class PaymentSuccessPageModule { }
