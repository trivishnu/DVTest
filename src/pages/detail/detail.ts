import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';


@IonicPage()
@Component({
  selector: 'page-detail',
  templateUrl: 'detail.html',
})
export class DetailPage {
  public title: string = "Details";

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams) {
    this.title = navParams.get("title");
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad DetailPage');
  }

}
