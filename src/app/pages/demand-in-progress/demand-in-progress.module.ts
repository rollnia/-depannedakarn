import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { DemandInProgressPageRoutingModule } from './demand-in-progress-routing.module';

import { DemandInProgressPage } from './demand-in-progress.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    DemandInProgressPageRoutingModule
  ],
  declarations: [DemandInProgressPage]
})
export class DemandInProgressPageModule {}
