import { Component, ViewChild } from '@angular/core';

import { ActionSheetController, NavController, Tabs, Events } from 'ionic-angular';

import { FundsPage } from '../funds/funds';
import { TrackerPage } from '../tracker/tracker';
import { EducationPage } from '../education/education';
import { WatchlistPage } from '../watchlist/watchlist';
import { OverviewPage } from '../overview/overview';
import { SummaryPage } from '../summary/summary';
import { SearchPage } from '../search/search';
import { AboutPage } from '../about/about';
import { ContactPage } from '../contact/contact';

@Component({
  templateUrl: 'tabs.html'
})
export class TabsPage {
  @ViewChild('appTabs') tabsRef: Tabs;

  tab1Root = FundsPage;
  tab2Root = TrackerPage;
  tab3Root = EducationPage;
  tab4Root = WatchlistPage;

  constructor(
    public actionSheetCtl: ActionSheetController,
    public navCtrl: NavController,
    events: Events) {

    events.subscribe('navigation:watchlist', () => {
      // primarily used when user clicks the 3D Touch to jump to a specific tab
      this.tabsRef.select(3);
    });
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
          text: 'Symbol Search',
          handler: () => {
            console.log('Symbol Search clicked');
            this.navCtrl.push(SearchPage);
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
