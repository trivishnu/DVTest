import { Component, ViewChild } from '@angular/core';
import { Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { ThreeDeeTouch, ThreeDeeTouchQuickAction } from '@ionic-native/three-dee-touch';

import { TabsPage } from '../pages/tabs/tabs';

@Component({
  templateUrl: 'app.html'
})
export class SpdrApp {
  rootPage: any = TabsPage;

  constructor(platform: Platform,
    statusBar: StatusBar,
    splashScreen: SplashScreen,
    public threeDeeTouch: ThreeDeeTouch) {
    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      threeDeeTouch.isAvailable().then(isAvailable => this.configureThreeDeeTouch(isAvailable));

      statusBar.styleDefault();
      splashScreen.hide();
    });
  }

  configureThreeDeeTouch(isAvailable: boolean) {
    if(isAvailable){
      let actions: Array<ThreeDeeTouchQuickAction> = [
        {
          type: 'checkin', // optional, but can be used in the onHomeIconPressed callback
          title: 'Check in', // mandatory
          subtitle: 'Quickly check in', // optional
          iconType: 'Compose' // optional
        },
        {
          type: 'share',
          title: 'Share',
          subtitle: 'Share like you care',
          iconType: 'Share'
        }
      ];

      this.threeDeeTouch.configureQuickActions(actions);

      this.threeDeeTouch.onHomeIconPressed().subscribe((payload) => {
        console.log("Icon pressed. Type: " + payload.type + ". Title: " + payload.title + ".");
        if (payload.type == 'checkin') {
          console.log("checkin option selected");
        } else if (payload.type == 'share') {
          console.log("share option selected");
        } else {
          // hook up any other icons you may have and do something awesome (e.g. launch the Camera UI, then share the image to Twitter)
          console.log(JSON.stringify(payload));
        }
      })
    }
  }
}
