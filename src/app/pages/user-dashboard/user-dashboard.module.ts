import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { UserDashboardPageRoutingModule } from './user-dashboard-routing.module';
import { HeaderPageModule } from "../header/header.module";
import { UserDashboardPage } from './user-dashboard.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    UserDashboardPageRoutingModule, HeaderPageModule
  ],
  declarations: [UserDashboardPage]
})
export class UserDashboardPageModule { }
