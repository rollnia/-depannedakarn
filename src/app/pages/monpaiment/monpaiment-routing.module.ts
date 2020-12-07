import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MonpaimentPage } from './monpaiment.page';

const routes: Routes = [
  {
    path: '',
    component: MonpaimentPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MonpaimentPageRoutingModule {}
