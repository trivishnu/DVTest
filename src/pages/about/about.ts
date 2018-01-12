import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';

import { NativeStorage } from '@ionic-native/native-storage';

@Component({
  selector: 'page-about',
  templateUrl: 'about.html'
})
export class AboutPage {
  pushToken: string;

  constructor(public navCtrl: NavController,
    private nativeStorage: NativeStorage) {

  }

  ionViewWillEnter() {
    // TODO: this should be in the alerts provider
    this.nativeStorage.getItem('pushToken')
      .then(
      data => this.pushToken = data.registrationId,
      error => console.error(error)
      );
  }
}
