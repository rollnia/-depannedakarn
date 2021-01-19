import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SubscriptionListingPage } from './subscription-listing.page';

const routes: Routes = [
  {
    path: '',
    component: SubscriptionListingPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SubscriptionListingPageRoutingModule {}
