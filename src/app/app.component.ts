import { Component } from '@angular/core';
import { Platform, ModalController, Events } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { ThreeDeeTouch, ThreeDeeTouchQuickAction } from '@ionic-native/three-dee-touch';
import { Push } from '@ionic-native/push';

import { TabsPage } from '../pages/tabs/tabs';
import { NotificationsPage } from '../pages/notifications/notifications';

@Component({
  templateUrl: 'app.html'
})
export class SpdrApp {
  rootPage: any = TabsPage;
  pushNotification: any;

  constructor(platform: Platform,
    statusBar: StatusBar,
    splashScreen: SplashScreen,
    public threeDeeTouch: ThreeDeeTouch,
    private modalCtrl: ModalController,
    private events: Events,
    public push: Push) {
    platform.ready().then(() => {
      this.pushNotification = push.init({});
      this.pushNotification.on('registration', (data) => {
        console.log('pushToken: ' + data.registrationId);
        console.log('registrationType:' + data.registrationType);
      });
      threeDeeTouch.isAvailable().then(isAvailable => this.configureThreeDeeTouch(isAvailable));
      statusBar.styleDefault();
      splashScreen.hide();
    });
  }

  configureThreeDeeTouch(isAvailable: boolean) {
    if (isAvailable) {
      let actions: Array<ThreeDeeTouchQuickAction> = [
        {
          type: 'watchlist',
          title: 'Watchlist',
          subtitle: 'View your watchlist',
          iconType: 'Favorite'
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
        if (payload.type == 'watchlist') {
          // tabs controller will take care of jumping to the right view
          this.events.publish('navigation:watchlist');
        } else if (payload.type == 'notifications') {
          let notificationsModal = this.modalCtrl.create(NotificationsPage);
          notificationsModal.present();
        } else {
          console.log(JSON.stringify(payload));
        }
      })
    }
  }
}
