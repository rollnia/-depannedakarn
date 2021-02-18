import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { FaqPageRoutingModule } from './faq-routing.module';
import { HeaderPageModule } from "../header/header.module";
import { FaqPage } from './faq.page';
import { ExpandableComponent } from "../../components/expandable/expandable.component";

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    FaqPageRoutingModule,
	HeaderPageModule
  ],
  declarations: [FaqPage, ExpandableComponent]
})
export class FaqPageModule {}
