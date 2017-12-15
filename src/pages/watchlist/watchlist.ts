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
