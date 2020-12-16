import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';
import { Ionic4DatepickerModule } from '@logisticinfotech/ionic4-datepicker';
import { MonpaimentPageRoutingModule } from './monpaiment-routing.module';
import { HeaderPageModule } from "../header/header.module";
import { MonpaimentPage } from './monpaiment.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    MonpaimentPageRoutingModule,
    Ionic4DatepickerModule,
    HeaderPageModule
  ],
  declarations: [MonpaimentPage],
  exports: [HeaderPageModule]
})
export class MonpaimentPageModule { }
