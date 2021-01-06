import { Component } from '@angular/core';
import {
    ModalController,
    NavParams
} from '@ionic/angular';
import { SafeResourceUrl, DomSanitizer } from '@angular/platform-browser';

@Component({
    selector: 'app-payment-type',
    templateUrl: './payment-type.html',
    styleUrls: ['./payment-type.scss'],
})
export class PaymentType {
    sanitizedURL;
    isSelfUrl = false;
    constructor(public modalCtrl: ModalController, public navParams: NavParams, public domSanitizer: DomSanitizer) {
        this.sanitizedURL = this.domSanitizer.bypassSecurityTrustResourceUrl(this.navParams.data.paramURL);
    }

    ionViewDidEnter() {
        const getURL = <HTMLInputElement>document.getElementById('iframeURL');
        const checkURL = setInterval(() => {
            console.log(getURL.src)
            if (getURL.src.indexOf('depannedakar') > -1) {
                this.isSelfUrl = true;
                clearInterval(checkURL);
            }
        }, 100);
    }

}
