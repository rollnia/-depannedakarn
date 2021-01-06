import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { PaymentPageRoutingModule } from './payment-routing.module';
import { HeaderPageModule } from "../header/header.module";
import { PaymentPage } from './payment.page';
import { PaymentType } from "./payment-type";

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    PaymentPageRoutingModule, HeaderPageModule
  ],
  declarations: [PaymentPage, PaymentType]
})
export class PaymentPageModule { }
