import { NgModule, ErrorHandler } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { SpdrApp } from './app.component';
import { ChartsModule } from 'ng2-charts';

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
import { NotificationsPage } from '../pages/notifications/notifications';
import { LoginPage } from '../pages/login/login';
import { DetailPage } from '../pages/detail/detail';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { AppVersion } from '@ionic-native/app-version';
import { TapticEngine } from '@ionic-native/taptic-engine';
import { Network } from '@ionic-native/network';
import { ThreeDeeTouch } from '@ionic-native/three-dee-touch';
import { Push } from '@ionic-native/push';

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
    TabsPage,
    NotificationsPage,
    LoginPage,
    DetailPage
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(SpdrApp),
    ChartsModule
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
    TabsPage,
    NotificationsPage,
    LoginPage,
    DetailPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    AppVersion,
    TapticEngine,
    Network,
    ThreeDeeTouch,
    Push,
    {provide: ErrorHandler, useClass: IonicErrorHandler}
  ]
})
export class AppModule {}
