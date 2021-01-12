import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { BitPaymentPage } from './bit-payment.page';

const routes: Routes = [
  {
    path: '',
    component: BitPaymentPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class BitPaymentPageRoutingModule {}
