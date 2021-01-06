import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';
import { PayPal } from '@ionic-native/paypal/ngx';
import { InAppBrowser } from '@ionic-native/in-app-browser/ngx';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { AppComponent } from './app.component';
import { TokenInterceptorService } from "./shared/services/token-interceptor.service";
import { AppRoutingModule } from './app-routing.module';
import { HeaderPageModule } from "../app/pages/header/header.module";
@NgModule({
  declarations: [AppComponent],
  entryComponents: [],
  imports: [
    BrowserModule,
    ReactiveFormsModule,
    FormsModule,
    HttpClientModule,
    IonicModule.forRoot(),
    AppRoutingModule,
    HeaderPageModule
  ],
  providers: [
    StatusBar,
    SplashScreen,
	InAppBrowser,
    PayPal,
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: TokenInterceptorService,
      multi: true
    }
  ],
  exports: [HeaderPageModule],
  bootstrap: [AppComponent]
})
export class AppModule { }
