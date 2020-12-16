import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';
import { BarRatingModule } from "ngx-bar-rating";
import { HeaderPageModule } from "../header/header.module";
import { BookingdetailPageRoutingModule } from './bookingdetail-routing.module';

import { BookingdetailPage } from './bookingdetail.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    BarRatingModule,
    BookingdetailPageRoutingModule,
    HeaderPageModule
  ],
  declarations: [BookingdetailPage]
})
export class BookingdetailPageModule { }
