import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ServiceProvidorDashboardPageRoutingModule } from './service-providor-dashboard-routing.module';

import { ServiceProvidorDashboardPage } from './service-providor-dashboard.page';
import { HeaderPageModule } from "../header/header.module";
@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ServiceProvidorDashboardPageRoutingModule, HeaderPageModule
  ],
  declarations: [ServiceProvidorDashboardPage]
})
export class ServiceProvidorDashboardPageModule { }
