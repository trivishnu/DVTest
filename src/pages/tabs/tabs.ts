import { Component, ViewChild } from '@angular/core';

import { ActionSheetController, NavController, Tabs, ModalController } from 'ionic-angular';

import { TrackerPage } from '../tracker/tracker';
import { EducationPage } from '../education/education';
import { SummaryPage } from '../summary/summary';
import { AboutPage } from '../about/about';
import { ContactPage } from '../contact/contact';
import { HowToPurchasePage } from '../how-to-purchase/how-to-purchase';
import { DisclaimersAndRisksPage } from '../disclaimers-and-risks/disclaimers-and-risks';
import { PrivacyPage } from '../privacy/privacy';
import { TermsAndConditionsPage } from '../terms-and-conditions/terms-and-conditions';
//import { WatchlistPage } from '../watchlist/watchlist';
//import { SearchPage } from '../search/search';

@Component({
  templateUrl: 'tabs.html'
})
export class TabsPage {
  @ViewChild('appTabs') tabsRef: Tabs;

  tab1Root = EducationPage;
  tab2Root = TrackerPage;

  constructor(
    public actionSheetCtl: ActionSheetController,
    public navCtrl: NavController,
    public modalCtrl: ModalController) {
  }

  showMore() {
    let actionSheet = this.actionSheetCtl.create({
      title: 'More',
      buttons: [
        {
          text: 'Contact Us',
          handler: () => {
            this.navCtrl.push(ContactPage);
          }
        },
        {
          text: 'How To Purchase',
          handler: () => {
            this.navCtrl.push(HowToPurchasePage);
          }
        },
        {
          text: 'US Market Weekly Summary',
          handler: () => {
            this.navCtrl.push(SummaryPage);
          }
        },
        {
          text: 'Disclaimer/Risks',
          handler: () => {
            this.navCtrl.push(DisclaimersAndRisksPage);
          }
        },
        {
          text: 'Privacy Statement',
          handler: () => {
            this.navCtrl.push(PrivacyPage);
          }
        },
        {
          text: 'Terms & Conditions',
          handler: () => {
            this.navCtrl.push(TermsAndConditionsPage);
          }
        },
        {
          text: 'About',
          handler: () => {
            console.log('About clicked');
            this.navCtrl.push(AboutPage);
          }
        },
//        {
//          text: 'Watchlist',
//          handler: () => {
//            console.log('Watchlist clicked');
//            this.navCtrl.push(WatchlistPage);
//          }
//        },
//        {
//          text: 'Symbol Search',
//          handler: () => {
//            console.log('Symbol Search clicked');
//            this.navCtrl.push(SearchPage);
//          }
//        },
        {
          text: 'Cancel',
          role: 'cancel',
          handler: () => {
            console.log('Cancel clicked');
          }
        }
      ]
    });
    actionSheet.present();
  }
}
