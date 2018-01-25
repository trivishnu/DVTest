import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';

import { NativeStorage } from '@ionic-native/native-storage';
import { AppVersion } from '@ionic-native/app-version';

@Component({
  selector: 'page-about',
  templateUrl: 'about.html'
})
export class AboutPage {
  pushToken: string;
  version: string;

  constructor(public navCtrl: NavController,
    private nativeStorage: NativeStorage,
    private appVersion: AppVersion) {

  }

  ionViewWillEnter() {
    // TODO: this should be in the alerts provider
    this.nativeStorage.getItem('pushToken')
      .then(
        data => this.pushToken = data.registrationId,
        error => console.error(error)
      );

    this.appVersion.getVersionNumber()
      .then(
        version => this.version = version
      );
  }

}
