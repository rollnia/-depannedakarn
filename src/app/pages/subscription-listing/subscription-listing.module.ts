import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { SubscriptionListingPageRoutingModule } from './subscription-listing-routing.module';
import { HeaderPageModule } from "../header/header.module";
import { SubscriptionListingPage } from './subscription-listing.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SubscriptionListingPageRoutingModule,
    HeaderPageModule
  ],
  declarations: [SubscriptionListingPage]
})
export class SubscriptionListingPageModule { }
