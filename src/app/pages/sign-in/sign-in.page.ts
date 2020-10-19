import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { Subscription } from "rxjs";
import { Router } from '@angular/router';

import { AppPostService } from "../../shared/services/app-post.service";
import { AppGetService } from "../../shared/services/app-get.service";

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.page.html',
  styleUrls: ['./sign-in.page.scss'],
})
export class SignInPage implements OnInit {
  public loginForm: FormGroup;
  public isSubmitted: boolean = false;
  public subscriptions: Subscription[] = [];

  constructor(public formBuilder: FormBuilder, private appGetService: AppGetService, private appPostService: AppPostService, private router: Router) { }

  ngOnInit() {
    this.createLoginForm();
  }

  ngOnDestroy() {
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
        if (res['user_type'] === 'client') {
          this.router.navigate(['/user-dashboard']);
        } else {
          this.router.navigate(['/service-providor-dashboard']);
        }
      }
    }, error => {
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
  public login(formData) {
    if (this.loginForm.invalid) {
      this.isSubmitted = true;
      return;
    }
    const reqObj = {
      username: formData['controls']['username'].value,
      password: formData['controls']['password'].value,
    };
    const subs = this.appPostService.loginUser(reqObj).subscribe(res => {
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
      console.error(error);
    });
    this.subscriptions.push(subs);
  }
}
