import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ServiceProvidorDashboardPage } from './service-providor-dashboard.page';

const routes: Routes = [
  {
    path: '',
    component: ServiceProvidorDashboardPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ServiceProvidorDashboardPageRoutingModule {}
