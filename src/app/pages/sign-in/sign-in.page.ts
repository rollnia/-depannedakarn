import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { Subscription } from "rxjs";
import { Router } from '@angular/router';

import { AppPostService } from "../../shared/services/app-post.service";
import { AppGetService } from "../../shared/services/app-get.service";
import { LoadingController, Platform } from '@ionic/angular';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.page.html',
  styleUrls: ['./sign-in.page.scss'],
})
export class SignInPage {
  public loginForm: FormGroup;
  public isSubmitted: boolean = false;
  public subscriptions: Subscription[] = [];
  loading: any;

  constructor(private platform: Platform, public formBuilder: FormBuilder, private appGetService: AppGetService, private appPostService: AppPostService, private router: Router, public loadingController: LoadingController) {
    this.platform.backButton.subscribeWithPriority(10, () => {
      this.router.navigate(['/home']);
    });
  }

  ionViewDidEnter() {
    this.createLoginForm();
  }

  ionViewDidLeave() {
    this.subscriptions.forEach(subs => subs.unsubscribe());
  }

  private createLoginForm() {
    this.loginForm = this.formBuilder.group({
      username: ['', [Validators.required]],
      password: ['', [Validators.required]]
    });
  }

  private getUserType() {
    const subs = this.appGetService.userType().subscribe(res => {
      if (res?.user_type) {
        this.loading.dismiss();
        const user = JSON.parse(localStorage.getItem('currentUserData'));
        user['user_type'] = res['user_type'];
        localStorage.setItem('currentUserData', JSON.stringify(user));
        if (res['user_type'] === 'client') {
          this.router.navigate(['/user-dashboard']);
        } else {
          this.router.navigate(['/service-providor-dashboard']);
        }
      }
    }, error => {
      this.loading.dismiss();
      console.error(error);
    });
    this.subscriptions.push(subs);
  }

  get errorControl() {
    return this.loginForm.controls;
  }
  /**
   * Method to login user 
   * @param formData : Login form controls
   */
  public async login(formData) {
    this.loading = await this.loadingController.create({
      message: 'Loading please wait',
    });

    if (this.loginForm.invalid) {
      this.isSubmitted = true;
      return;
    }
    const reqObj = {
      username: formData['controls']['username'].value,
      password: formData['controls']['password'].value,
    };

    this.loading.present();
    const subs = this.appPostService.loginUser(reqObj).subscribe(res => {
      this.loading.dismiss();
      if (res?.access_token) {
        console.info(res);
        const userData = {
          token: res['access_token']
        };
        localStorage.setItem('currentUserData', JSON.stringify(userData));
        this.createLoginForm();
        this.getUserType();
        // this.router.navigate(['/folder/Inbox']);
      }
    }, error => {
      this.loading.dismiss();
      console.error(error);
    });
    this.subscriptions.push(subs);
  }

  public goToRegistration() {
    this.router.navigate(['/sign-up']);
  }
}
