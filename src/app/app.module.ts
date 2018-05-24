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
import { AllFundsPerformancePage } from '../pages/all-fund-performance/all-funds-performance'
import { HowToPurchasePage } from '../pages/how-to-purchase/how-to-purchase';
import { DisclaimersAndRisksPage } from '../pages/disclaimers-and-risks/disclaimers-and-risks';
import { PrivacyPage } from '../pages/privacy/privacy';
import { TermsAndConditionsPage } from '../pages/terms-and-conditions/terms-and-conditions';

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

import {HttpAngularProvider} from '../providers/http-angular/http-angular';
import {HttpNativeProvider} from '../providers/http-native/http-native';

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
import { FundPremiumsComponent } from '../components/fund-premiums/fund-premiums';
import { SectorTrackerComponent } from '../components/sector-tracker/sector-tracker';
import { SAndPTrackerComponent } from '../components/s-and-p-tracker/s-and-p-tracker';

import { PdfViewerModule } from 'ng2-pdf-viewer';
import { DocumentViewPage } from '../pages/document-view/document-view';

import { DirectivesModule } from '../directives/directives.module';

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
    AllFundsPerformancePage,
    HowToPurchasePage,
    DisclaimersAndRisksPage,
    PrivacyPage,
    TermsAndConditionsPage,
    FundDetailsComponent,
    FundHoldingsComponent,
    FundProfileComponent,
    FundSnapshotComponent,
    FiftyTwoWeeksChartComponent,
    FundDistributionComponent,
    FundDocumentsComponent,
    FundPerformanceComponent,
    FundDailyCalculationComponent,
    FundPremiumsComponent,
    SectorTrackerComponent,
    SAndPTrackerComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    IonicModule.forRoot(SpdrApp),
    ChartsModule,
    FinancialAPIModule,
    PdfViewerModule,
    DirectivesModule
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
    AllFundsPerformancePage,
    HowToPurchasePage,
    DisclaimersAndRisksPage,
    PrivacyPage,
    TermsAndConditionsPage
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
    HttpAngularProvider,
    HttpNativeProvider,
    SectorSpdrService
  ]
})
export class AppModule {}
