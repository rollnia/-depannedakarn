import { Component, OnInit } from '@angular/core';

import { Platform } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';

import { LoadingController } from '@ionic/angular';
import { Router } from '@angular/router';

import { Subscription } from "rxjs";

import { AppGetService } from "./shared/services/app-get.service";

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss']
})
export class AppComponent implements OnInit {
  public selectedIndex = 0;
  public user;
  loading: any;
  public subscriptions: Subscription[] = [];
  public appPages = [
    /*{
      title: 'Home',
      url: '/folder/Inbox',
      icon: 'home'
    },*/
    {
      title: 'Home',
      url: '/home',
      icon: 'home'
    },
    {
      title: 'Search Provider',
      url: '/searchprovider',
      icon: 'search'
    },
    {
      title: 'Listing',
      url: '/listing',
      icon: 'list'
    },
    {
      title: 'Sign in',
      url: '/sign-in',
      icon: 'log-in'
    },
    {
      title: 'Sign up',
      url: '/sign-up',
      icon: 'person-add'
    }
  ];

  constructor(
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar,
    private appGetService: AppGetService,
    public loadingController: LoadingController,
    private router: Router
  ) {
    this.initializeApp();
  }

  initializeApp() {
    this.platform.ready().then(() => {
      this.statusBar.styleDefault();
      this.splashScreen.hide();
    });
  }

  ngOnInit() {
    this.user = JSON.parse(localStorage.getItem('currentUserData'));;
    const path = window.location.pathname.split('folder/')[1];
    if (path !== undefined) {
      this.selectedIndex = this.appPages.findIndex(page => page.title.toLowerCase() === path.toLowerCase());
    }
  }

  ngOnDestroy() {
    this.subscriptions.forEach(subs => subs.unsubscribe());
  }

  /**
   * Method to logout user from app
   */
  public async logout() {
    this.loading = await this.loadingController.create({
      message: 'Loading please wait',
    });
    this.loading.present();
    const subs = this.appGetService.logoutUser().subscribe(res => {
      if (res?.message) {
        this.loading.dismiss();
        localStorage.removeItem('currentUserData');
        this.router.navigate(['/home']);
      }
    }, error => {
      this.loading.dismiss();
      console.error(error);
    });
    this.subscriptions.push(subs);
  }

  public userData() {
    const user = JSON.parse(localStorage.getItem('currentUserData'));
    if (user && user['token']) {
      return true;
    }
    return false;
  }
}
