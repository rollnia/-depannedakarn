import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { BarRatingModule } from "ngx-bar-rating";
import { IonicModule } from '@ionic/angular';

import { NotificationDetailPageRoutingModule } from './notification-detail-routing.module';
import { HeaderPageModule } from "../header/header.module";
import { NotificationDetailPage } from './notification-detail.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    BarRatingModule,
    NotificationDetailPageRoutingModule, HeaderPageModule
  ],
  declarations: [NotificationDetailPage]
})
export class NotificationDetailPageModule { }
