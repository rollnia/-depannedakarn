import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ServiceProvidorDashboardPageRoutingModule } from './service-providor-dashboard-routing.module';

import { ServiceProvidorDashboardPage } from './service-providor-dashboard.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ServiceProvidorDashboardPageRoutingModule
  ],
  declarations: [ServiceProvidorDashboardPage]
})
export class ServiceProvidorDashboardPageModule {}
