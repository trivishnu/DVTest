import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

import { ContactPage } from '../contact/contact';

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

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad EducationPage');
  }

  techniqueSelected() {
    this.navCtrl.push(ContactPage);
  }

  librarySelected() {
    this.navCtrl.push(ContactPage);
  }
}
