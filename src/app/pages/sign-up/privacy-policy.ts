import { Component } from '@angular/core';
import { ModalController } from '@ionic/angular';


@Component({
  selector: 'app-privacy-policy',
  templateUrl: './privacy-policy.html',
  styleUrls: ['./privacy-policy.scss'],
})
export class PrivacyPolicy {

  constructor(public modalCtrl: ModalController) {

  }

  agree() {
    this.modalCtrl.dismiss({
        'agree': true
    });
  }

  disagree() {
    this.modalCtrl.dismiss({
        'agree': false
    });
  }

}
