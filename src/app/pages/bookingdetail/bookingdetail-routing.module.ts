import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { BookingdetailPage } from './bookingdetail.page';

const routes: Routes = [
  {
    path: '',
    component: BookingdetailPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class BookingdetailPageRoutingModule {}
