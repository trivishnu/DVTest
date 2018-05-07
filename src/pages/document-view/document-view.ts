import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';


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
