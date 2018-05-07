import { Component, ViewChild } from '@angular/core';

import { ActionSheetController, NavController, Tabs, ModalController } from 'ionic-angular';

import { ChartsPage } from '../charts/charts';
import { TrackerPage } from '../tracker/tracker';
import { WatchlistPage } from '../watchlist/watchlist';
import { EducationPage } from '../education/education';
import { OverviewPage } from '../overview/overview';
import { SummaryPage } from '../summary/summary';
import { SearchPage } from '../search/search';
import { AboutPage } from '../about/about';
import { ContactPage } from '../contact/contact';
import { WheelPage } from '../wheel/wheel';
import { AllFundsPerformancePage } from '../all-fund-performance/all-funds-performance'

@Component({
  templateUrl: 'tabs.html'
})
export class TabsPage {
  @ViewChild('appTabs') tabsRef: Tabs;

  tab1Root = ChartsPage;
  tab2Root = TrackerPage;

  constructor(
    public actionSheetCtl: ActionSheetController,
    public navCtrl: NavController,
    public modalCtrl: ModalController) {
  }

  showWheel() {
    let wheelModal = this.modalCtrl.create(WheelPage);
    wheelModal.present();
  }

  showMore() {
    let actionSheet = this.actionSheetCtl.create({
      title: 'More Actions',
      buttons: [
        {
          text: 'Market Overview',
          handler: () => {
            console.log('Market Overview clicked');
            this.navCtrl.push(OverviewPage);
          }
        },
        {
          text: 'Weekly Summary',
          handler: () => {
            console.log('Weekly Summary clicked');
            this.navCtrl.push(SummaryPage);
          }
        },
        {
          text: 'Watchlist',
          handler: () => {
            console.log('Watchlist clicked');
            this.navCtrl.push(WatchlistPage);
          }
        },
        {
          text: 'Education',
          handler: () => {
            console.log('Education clicked');
            this.navCtrl.push(EducationPage);
          }
        },
        {
          text: 'Symbol Search',
          handler: () => {
            console.log('Symbol Search clicked');
            this.navCtrl.push(SearchPage);
          }
        },
        {
          text: 'All Funds Performance',
          handler: () => {
            this.navCtrl.push(AllFundsPerformancePage);
          }
        },
        {
          text: 'About',
          handler: () => {
            console.log('About clicked');
            this.navCtrl.push(AboutPage);
          }
        },
        {
          text: 'Contact',
          handler: () => {
            console.log('Contact clicked');
            this.navCtrl.push(ContactPage);
          }
        },
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
