import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';
// import { StarRatingModule } from 'ionic4-star-rating';
import { ListingPageRoutingModule } from './listing-routing.module';
import { HeaderPageModule } from "../header/header.module";
import { ListingPage } from './listing.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ListingPageRoutingModule,
    HeaderPageModule
  ],
  declarations: [ListingPage]
})
export class ListingPageModule { }
