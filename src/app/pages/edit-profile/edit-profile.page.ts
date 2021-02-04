import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { Subscription } from "rxjs";
import { Router, ActivatedRoute } from '@angular/router';
import { LoadingController, AlertController, Platform } from '@ionic/angular';
import { AppGetService } from "../../shared/services/app-get.service";
import { AppPostService } from "../../shared/services/app-post.service";
@Component({
  selector: 'app-edit-profile',
  templateUrl: './edit-profile.page.html',
  styleUrls: ['./edit-profile.page.scss'],
})
export class EditProfilePage {
  public editProfileForm: FormGroup;
  public isSubmitted: boolean = false;
  public subscriptions: Subscription[] = [];
  public user;
  loading: any;
  return: string = '';
  constructor(private alertCtrl: AlertController, private platform: Platform, private appGetService: AppGetService, public formBuilder: FormBuilder, private appPostService: AppPostService, private route: ActivatedRoute, private router: Router, public loadingController: LoadingController) {

  }

  ionViewWillEnter() {
    this.user = JSON.parse(localStorage.getItem('currentUserData'));
    const backEvent = this.platform.backButton.subscribe(() => {
      if (this.user && this.user['user_type'] === 'client') {
        this.router.navigate(['/user-dashboard']);
      } else if (this.user && this.user['user_type'] === 'provider') {
        this.router.navigate(['/service-providor-dashboard']);
      } else {
        this.router.navigate(['/home']);
      }
    });
    this.subscriptions.push(backEvent);
  }

  ionViewDidEnter() {
    this.user = JSON.parse(localStorage.getItem('currentUserData'));
    this.createEditProfileForm();
  }

  ionViewDidLeave() {
    this.subscriptions.forEach(subs => subs.unsubscribe());
  }

  get errorControl() {
    return this.editProfileForm.controls;
  }

  private createEditProfileForm() {
    this.editProfileForm = this.formBuilder.group({
      name: [this.user['user_name']],
      phone: [this.user['user_phone'], [Validators.pattern('^[0-9]+$')]],
      email: [this.user['user_email'], [Validators.pattern('[a-zA-Z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,3}$')]],
      password: [''],
      confirmPassword: ['']
    });
  }

  private checkPwd(formData) {
    const pwd = formData['controls']['password'].value;
    const cPwd = formData['controls']['confirmPassword'].value;
    if (pwd === '' && cPwd === '') {
      return;
    }
    if (pwd !== cPwd) {
      formData['controls']['confirmPassword'].setErrors({ 'different': true });
    }
  }

  public async editAccount(formData) {
    this.checkPwd(formData);
    if (this.editProfileForm.invalid) {
      this.isSubmitted = true;
      return;
    }

    const reqObj = {
      user_id: this.user['user_id'],
      phone: formData['controls']['phone'].value,
      email: formData['controls']['email'].value,
      password: formData['controls']['password'].value,
    };

    this.loading = await this.loadingController.create({
      message: 'Chargement en cours',
    });

    this.loading.present();

    const subs = this.appPostService.editProfileAccnt(reqObj).subscribe(res => {
      this.loading.dismiss();
      if (res?.msgid && Number(res.msgid) === 1) {
        this.appGetService.showToast(res['message']);
        this.appGetService.showToast('Please login with updated password');
        this.router.navigate(['/sign-in']);
      } else {
        this.appGetService.showToast(res['message']);
      }
    }, error => {
      this.loading.dismiss();
      console.error(error);
    });
    this.subscriptions.push(subs);
  }

}
