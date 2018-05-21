import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';


@IonicPage()
@Component({
  selector: 'page-disclaimers-and-risks',
  templateUrl: 'disclaimers-and-risks.html',
})
export class DisclaimersAndRisksPage {

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad DisclaimersAndRisksPage');
  }

}
