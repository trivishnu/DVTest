import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

import { DetailPage } from '../detail/detail';

@IonicPage()
@Component({
  selector: 'page-education',
  templateUrl: 'education.html',
})
export class EducationPage {
  public techniques: Array<string> = [
    "Customize S&P 500",
    "Equal Sector Strategy",
    "Tax Strategies"
  ];

  public libraries: Array<string> = [
    "All General",
    "XLY - Consumer Discresionary",
    "XLE - Energy Documents"
  ];

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams) {

  }

  ionViewDidLoad() {
    this.navCtrl.parent.select(2);
    console.log('ionViewDidLoad EducationPage');
  }

  // Workaround for ionic issue redrawing slides
  // https://github.com/ionic-team/ionic/issues/11216
  ionViewDidEnter() {
    try {
      let event = document.createEvent('HTMLEvents');
      event.initEvent('resize', true, false);
      window.dispatchEvent(event);
    } catch (e) { }
  }

  techniqueSelected(selection) {
    this.navCtrl.push(DetailPage, {title: selection});
  }

  librarySelected(selection) {
    this.navCtrl.push(DetailPage, {title: selection});
  }

}
