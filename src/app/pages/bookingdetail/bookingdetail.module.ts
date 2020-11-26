import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { BookingdetailPageRoutingModule } from './bookingdetail-routing.module';

import { BookingdetailPage } from './bookingdetail.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    BookingdetailPageRoutingModule
  ],
  declarations: [BookingdetailPage]
})
export class BookingdetailPageModule {}
