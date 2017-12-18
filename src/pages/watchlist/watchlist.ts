import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams , ModalController} from 'ionic-angular';

import { NotificationsPage } from '../notifications/notifications';
import { LoginPage } from '../login/login';

@IonicPage()
@Component({
  selector: 'page-watchlist',
  templateUrl: 'watchlist.html',
})
export class WatchlistPage {

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public modalCtrl: ModalController) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad WatchlistPage');

    // workaround added due to this scenario:
    // * Start App for first time
    // * Minimize app
    // * Use 3DTouch to go to watchlist
    // * Shows watchlist page but tab icon is still set to the funds tab
    // * Minimize app
    // * Tap icon to resume app, watchlist page is shown and watchlist tab icon is selected
    this.navCtrl.parent.select(3);
  }

  notifications() {
    let notificationsModal = this.modalCtrl.create(NotificationsPage);
    notificationsModal.present();
  }

  logIn() {
    let loginModal = this.modalCtrl.create(LoginPage);
    loginModal.present();
  }

}
