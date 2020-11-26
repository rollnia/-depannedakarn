import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { DemandInProgressPage } from './demand-in-progress.page';

const routes: Routes = [
  {
    path: '',
    component: DemandInProgressPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DemandInProgressPageRoutingModule {}
