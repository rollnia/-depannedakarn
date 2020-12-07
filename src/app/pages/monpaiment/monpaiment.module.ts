import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { MonpaimentPageRoutingModule } from './monpaiment-routing.module';

import { MonpaimentPage } from './monpaiment.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    MonpaimentPageRoutingModule
  ],
  declarations: [MonpaimentPage]
})
export class MonpaimentPageModule {}
