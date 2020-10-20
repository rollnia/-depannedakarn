import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { Subscription } from "rxjs";
import { Router } from '@angular/router';
import { LoadingController } from '@ionic/angular';

import { AppPostService } from "../../shared/services/app-post.service";
import { AppGetService } from "../../shared/services/app-get.service";

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.page.html',
  styleUrls: ['./sign-up.page.scss'],
})
export class SignUpPage implements OnInit {
  public signUpForm: FormGroup;
  public isSubmitted: boolean = false;
  public subscriptions: Subscription[] = [];
  loading: any;

  constructor(public formBuilder: FormBuilder, private appGetService: AppGetService, private appPostService: AppPostService, private router: Router, public loadingController: LoadingController) { }

  ngOnInit() {
    this.createSignUpForm();
  }

  ngOnDestroy() {
    this.subscriptions.forEach(subs => subs.unsubscribe());
  }

  private createSignUpForm() {
    this.signUpForm = this.formBuilder.group({
      name: ['', [Validators.required, Validators.minLength(2)]],
      phone: ['', [Validators.required, Validators.pattern('^[0-9]+$')]],
      email: ['', [Validators.required, Validators.pattern('[a-zA-Z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,3}$')]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      confirmPassword: ['', [Validators.required, Validators.minLength(6)]],
      privacy: [false, Validators.pattern('true')]
    });
  }

  private checkPwd(formData) {
    const pwd = formData['controls']['password'].value;
    const cPwd = formData['controls']['confirmPassword'].value;

    if (pwd !== cPwd) {
      formData['controls']['confirmPassword'].setErrors({ 'different': true });
    }
  }

  private getUserType() {
    const subs = this.appGetService.userType().subscribe(res => {
      if (res?.user_type) {
        this.loading.dismiss();
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

  private loginUser(formData) {
    const reqObj = {
      username: formData['email'],
      password: formData['password'],
    };
    const subs = this.appPostService.loginUser(reqObj).subscribe(res => {
      this.loading.dismiss();
      if (res?.access_token) {
        console.info(res);
        const userData = {
          token: res['access_token']
        };
        localStorage.setItem('currentUserData', JSON.stringify(userData));
        this.getUserType();
      }
    }, error => {
      this.loading.dismiss();
      console.error(error);
    });
    this.subscriptions.push(subs);
  }

  get errorControl() {
    return this.signUpForm.controls;
  }
  /**
   * Method to use to create account for a user
   * @param form : signUpForm controls details
   */
  public async signUp(formData) {
    this.checkPwd(formData);
    if (this.signUpForm.invalid) {
      this.isSubmitted = true;
      return;
    }

    this.loading = await this.loadingController.create({
      message: 'Loading please wait',
    });

    const reqObj = {
      name: formData['controls']['name'].value,
      phone: formData['controls']['phone'].value,
      email: formData['controls']['email'].value,
      password: formData['controls']['password'].value,
    };
    this.loading.present();
    const subs = this.appPostService.signupUser(reqObj).subscribe(res => {
      this.createSignUpForm();
      this.loginUser(reqObj);
    }, error => {
      this.loading.dismiss();
      console.error(error);
    });
    this.subscriptions.push(subs);
  }

}
