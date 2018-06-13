import { NgModule } from '@angular/core';
import { IonicModule } from 'ionic-angular';
import { PipesModule } from '../pipes/pipes.module';

import { FundDetailsComponent } from './fund-details/fund-details';
import { FundHoldingsComponent } from './fund-holdings/fund-holdings';
import { FundProfileComponent } from './fund-profile/fund-profile';
import { FundSnapshotComponent } from './fund-snapshot/fund-snapshot';
import { FiftyTwoWeeksChartComponent } from './fifty-two-weeks-chart/fifty-two-weeks-chart';
import { FundDistributionComponent } from './fund-distribution/fund-distribution';
import { FundDocumentsComponent } from './fund-documents/fund-documents';
import { FundPerformanceComponent } from './fund-performance/fund-performance';
import { FundDailyCalculationComponent } from './fund-daily-calculation/fund-daily-calculation';
import { FundPremiumsComponent } from './fund-premiums/fund-premiums';
import { SectorTrackerComponent } from './sector-tracker/sector-tracker';
import { SAndPTrackerComponent } from './s-and-p-tracker/s-and-p-tracker';
import { FundBannerComponent } from './fund-banner/fund-banner';
import { FundChartingComponent } from './fund-charting/fund-charting';
import { FundNewsComponent } from './fund-news/fund-news';
import { FundDonutComponent } from './fund-donut/fund-donut';

@NgModule({
  declarations: [
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
    SAndPTrackerComponent,
    FundBannerComponent,
    FundChartingComponent,
    FundNewsComponent,
    FundDonutComponent
  ],
  imports: [
    IonicModule,
    PipesModule],
  exports: [
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
    SAndPTrackerComponent,
    FundBannerComponent,
    FundChartingComponent,
    FundNewsComponent,
    FundDonutComponent
  ]
})
export class ComponentsModule { }
