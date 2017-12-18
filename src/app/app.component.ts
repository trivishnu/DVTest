import { Component } from '@angular/core';
import { Platform, ModalController, Events } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { ThreeDeeTouch, ThreeDeeTouchQuickAction } from '@ionic-native/three-dee-touch';

import { TabsPage } from '../pages/tabs/tabs';
import { NotificationsPage } from '../pages/notifications/notifications';

@Component({
  templateUrl: 'app.html'
})
export class SpdrApp {
  rootPage: any = TabsPage;

  constructor(platform: Platform,
    statusBar: StatusBar,
    splashScreen: SplashScreen,
    public threeDeeTouch: ThreeDeeTouch,
    private modalCtrl: ModalController,
    private events: Events) {
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
          type: 'watchlist', // optional, but can be used in the onHomeIconPressed callback
          title: 'Watchlist', // mandatory
          subtitle: 'View your watchlist', // optional
          iconType: 'Favorite' // optional
        },
        {
          type: 'notifications',
          title: 'Notifications',
          subtitle: 'Notification settings',
          iconType: 'Alarm'
        }
      ];

      this.threeDeeTouch.configureQuickActions(actions);

      this.threeDeeTouch.onHomeIconPressed().subscribe((payload) => {
        console.log("Icon pressed. Type: " + payload.type + ". Title: " + payload.title + ".");
        if (payload.type == 'watchlist') {
          console.log("watchlist option selected");
          this.events.publish('navigation:watchlist');
          //this.appCtrl.getRootNav().getActiveChildNav().select(3);
        } else if (payload.type == 'notifications') {
          console.log("notifications option selected");
          let notificationsModal = this.modalCtrl.create(NotificationsPage);
          notificationsModal.present();
        } else {
          // hook up any other icons you may have and do something awesome (e.g. launch the Camera UI, then share the image to Twitter)
          console.log(JSON.stringify(payload));
        }
      })
    }
  }
}
