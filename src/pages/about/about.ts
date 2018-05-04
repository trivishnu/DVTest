import { Component } from '@angular/core';
import { Platform, NavController } from 'ionic-angular';

import { NativeStorage } from '@ionic-native/native-storage';
import { AppVersion } from '@ionic-native/app-version';
import { Network } from '@ionic-native/network';

@Component({
  selector: 'page-about',
  templateUrl: 'about.html'
})
export class AboutPage {
  pushToken: string;
  version: string;
  networkStatus: string;

  constructor(public navCtrl: NavController,
    private nativeStorage: NativeStorage,
    private appVersion: AppVersion,
    private platform: Platform,
    private network: Network) {

  }

  ionViewWillEnter() {
    // TODO: this should be in the alerts provider
    if (this.platform.is('cordova')) {
      this.nativeStorage.getItem('pushToken')
        .then(
          data => this.pushToken = data.registrationId,
          error => console.error(error)
        );

      this.appVersion.getVersionNumber()
        .then(
          version => this.version = version
        );

      this.networkStatus = this.network.type;
    }
  }

}
