import { NgModule, ErrorHandler } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { SpdrApp } from './app.component';

import { AboutPage } from '../pages/about/about';
import { ContactPage } from '../pages/contact/contact';
import { FundsPage } from '../pages/funds/funds';
import { TabsPage } from '../pages/tabs/tabs';
import { TrackerPage } from '../pages/tracker/tracker';
import { EducationPage } from '../pages/education/education';
import { WatchlistPage } from '../pages/watchlist/watchlist';
import { OverviewPage } from '../pages/overview/overview';
import { SearchPage } from '../pages/search/search';
import { SummaryPage } from '../pages/summary/summary';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { AppVersion } from '@ionic-native/app-version';
import { TapticEngine } from '@ionic-native/taptic-engine';
import { Network } from '@ionic-native/network';
import { ThreeDeeTouch } from '@ionic-native/three-dee-touch';

@NgModule({
  declarations: [
    SpdrApp,
    AboutPage,
    ContactPage,
    FundsPage,
    TrackerPage,
    EducationPage,
    WatchlistPage,
    OverviewPage,
    SearchPage,
    SummaryPage,
    TabsPage
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(SpdrApp)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    SpdrApp,
    AboutPage,
    ContactPage,
    FundsPage,
    TrackerPage,
    EducationPage,
    WatchlistPage,
    OverviewPage,
    SearchPage,
    SummaryPage,
    TabsPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    AppVersion,
    TapticEngine,
    Network,
    ThreeDeeTouch,
    {provide: ErrorHandler, useClass: IonicErrorHandler}
  ]
})
export class AppModule {}
