import { NgModule, ErrorHandler } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { SpdrApp } from './app.component';
import { ChartsModule } from 'ng2-charts';

import { AboutPage } from '../pages/about/about';
import { ContactPage } from '../pages/contact/contact';
import { ChartsPage } from '../pages/charts/charts';
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
import { FundPropertiesPage } from '../pages/fund-properties/fund-properties';
import { WheelPage } from '../pages/wheel/wheel';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { AppVersion } from '@ionic-native/app-version';
import { TapticEngine } from '@ionic-native/taptic-engine';
import { Network } from '@ionic-native/network';
import { ThreeDeeTouch } from '@ionic-native/three-dee-touch';
import { Push } from '@ionic-native/push';
import { NativeStorage } from '@ionic-native/native-storage';
import { HTTP } from '@ionic-native/http';
import { Keyboard } from '@ionic-native/keyboard';

import { FinancialAPIModule } from '../providers/FinancialAPI/FinancialAPIModule'
import { ChartService } from '../providers/fdsg/chartService';
import { SectorSpdrService } from '../providers/SectorSpdrAPI';

import { FundDetailsComponent } from '../components/fund-details/fund-details';
import { FundHoldingsComponent } from '../components/fund-holdings/fund-holdings';
import { FundProfileComponent } from '../components/fund-profile/fund-profile';
import { FundSnapshotComponent } from '../components/fund-snapshot/fund-snapshot';
import { FiftyTwoWeeksChartComponent } from '../components/fifty-two-weeks-chart/fifty-two-weeks-chart'
import { FundDistributionComponent } from '../components/fund-distribution/fund-distribution';
import { FundDocumentsComponent } from '../components/fund-documents/fund-documents';
import { FundPerformanceComponent } from '../components/fund-performance/fund-performance';
import { FundDailyCalculationComponent } from '../components/fund-daily-calculation/fund-daily-calculation'

import { PdfViewerModule } from 'ng2-pdf-viewer';
import { DocumentViewPage } from '../pages/document-view/document-view';

@NgModule({
  declarations: [
    SpdrApp,
    AboutPage,
    ContactPage,
    ChartsPage,
    TrackerPage,
    EducationPage,
    WatchlistPage,
    OverviewPage,
    SearchPage,
    SummaryPage,
    TabsPage,
    NotificationsPage,
    LoginPage,
    DetailPage,
    FundPropertiesPage,
    DocumentViewPage,
    WheelPage,
    FundDetailsComponent,
    FundHoldingsComponent,
    FundProfileComponent,
    FundSnapshotComponent,
    FiftyTwoWeeksChartComponent,
    FundDistributionComponent,
    FundDocumentsComponent,
    FundPerformanceComponent,
    FundDailyCalculationComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    IonicModule.forRoot(SpdrApp),
    ChartsModule,
    FinancialAPIModule,
    PdfViewerModule
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    SpdrApp,
    AboutPage,
    ContactPage,
    ChartsPage,
    TrackerPage,
    EducationPage,
    WatchlistPage,
    OverviewPage,
    SearchPage,
    SummaryPage,
    TabsPage,
    NotificationsPage,
    LoginPage,
    DetailPage,
    FundPropertiesPage,
    DocumentViewPage,
    WheelPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    AppVersion,
    TapticEngine,
    Network,
    ThreeDeeTouch,
    Push,
    NativeStorage,
    HTTP,
    Keyboard,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    ChartService,
    SectorSpdrService
  ]
})
export class AppModule {}
