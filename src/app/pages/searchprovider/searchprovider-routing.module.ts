import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SearchproviderPage } from './searchprovider.page';

const routes: Routes = [
  {
    path: '',
    component: SearchproviderPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SearchproviderPageRoutingModule {}
