import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

/**
 * Generated class for the DocumentViewPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-document-view',
  templateUrl: 'document-view.html',
})
export class DocumentViewPage {

  title : string;
  url : string;

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {

    this.title = this.navParams.get("title");
    this.url = this.navParams.get("url");

    console.log("this.url", this.url);
  }

}
