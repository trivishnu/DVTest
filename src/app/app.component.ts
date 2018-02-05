import { Component } from '@angular/core';
import { Platform, ModalController, Events } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { ThreeDeeTouch, ThreeDeeTouchQuickAction } from '@ionic-native/three-dee-touch';
import { Push, PushObject, PushOptions } from '@ionic-native/push';
import { NativeStorage } from '@ionic-native/native-storage';

import { TabsPage } from '../pages/tabs/tabs';
import { NotificationsPage } from '../pages/notifications/notifications';

@Component({
  templateUrl: 'app.html'
})
export class SpdrApp {
  rootPage: any = TabsPage;
  pushNotification: any;

  constructor(public platform: Platform,
    statusBar: StatusBar,
    splashScreen: SplashScreen,
    public threeDeeTouch: ThreeDeeTouch,
    private modalCtrl: ModalController,
    private events: Events,
    private push: Push,
    private nativeStorage: NativeStorage) {
    platform.ready().then(() => {
      this.initPushNotification();
      threeDeeTouch.isAvailable().then(isAvailable => this.configureThreeDeeTouch(isAvailable));
      statusBar.styleDefault();
      splashScreen.hide();
    });
  }

  initPushNotification() {
    if (!this.platform.is('cordova')) {
      console.warn('Push notifications not initialized. Cordova is not available - Run in physical device');
      return;
    }
    const options: PushOptions = {
      ios: {
        alert: 'true',
        badge: false,
        sound: 'true',
        clearBadge: 'true'
      }
    };
    const pushObject: PushObject = this.push.init(options);

    pushObject.on('registration').subscribe((data: any) => {
      console.log('device token -> ' + data.registrationId);
      //TODO: send device token to server on the alerts provider
      this.nativeStorage.setItem('pushToken', {registrationId: data.registrationId});
    });

    pushObject.on('error').subscribe(error => console.error('Error with Push plugin' + error));
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
