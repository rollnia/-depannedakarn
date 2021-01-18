import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';
import { Ionic4DatepickerModule } from '@logisticinfotech/ionic4-datepicker';
import { SubscriptionPageRoutingModule } from './subscription-routing.module';
import { HeaderPageModule } from "../header/header.module";
import { SubscriptionPage } from './subscription.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SubscriptionPageRoutingModule,
    Ionic4DatepickerModule,
    HeaderPageModule
  ],
  declarations: [SubscriptionPage]
})
export class SubscriptionPageModule { }
