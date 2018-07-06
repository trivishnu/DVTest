import { NgModule } from '@angular/core';
import { IonicModule } from 'ionic-angular';
import { PipesModule } from '../pipes/pipes.module';

import { FundDetailsComponent } from './fund-details/fund-details';
import { FundHoldingsComponent } from './fund-holdings/fund-holdings';
import { FundProfileComponent } from './fund-profile/fund-profile';
import { FundSnapshotComponent } from './fund-snapshot/fund-snapshot';
import { FiftyTwoWeeksChartComponent } from './chart-fifty-two-weeks/chart-fifty-two-weeks';
import { FundDistributionComponent } from './fund-distribution/fund-distribution';
import { FundDocumentsComponent } from './fund-documents/fund-documents';
import { FundPerformanceComponent } from './fund-performance/fund-performance';
import { FundDailyCalculationComponent } from './fund-daily-calculation/fund-daily-calculation';
import { FundPremiumsComponent } from './fund-premiums/fund-premiums';
import { SectorTrackerTileComponent } from './tile-sector-tracker/tile-sector-tracker';
import { SAndPTrackerTileComponent } from './tile-s-and-p-tracker/tile-s-and-p-tracker';
import { FundBannerComponent } from './fund-banner/fund-banner';
import { FundChartingComponent } from './fund-charting/fund-charting';
import { FundNewsComponent } from './fund-news/fund-news';
import { FundDonutComponent } from './fund-donut/fund-donut';
import { TrackerTilesComponent } from './tracker-tiles/tracker-tiles';
import { TrackerChartingComponent } from './tracker-charting/tracker-charting';
import { TrackerDocumentsComponent } from './tracker-documents/tracker-documents';
import { PanelComponent } from './panel/panel';
import { AccordionComponent } from './accordion/accordion';
import { SelectorSectorChartComponent } from './selector-sector-chart/selector-sector-chart';
import { RowSectorTrackerComponent } from './row-sector-tracker/row-sector-tracker';
import { ChartTimelineComponent } from './chart-timeline/chart-timeline';

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
    SectorTrackerTileComponent,
    SAndPTrackerTileComponent,
    FundBannerComponent,
    FundChartingComponent,
    FundNewsComponent,
    FundDonutComponent,
    TrackerTilesComponent,
    TrackerChartingComponent,
    TrackerDocumentsComponent,
    PanelComponent,
    AccordionComponent,
    SelectorSectorChartComponent,
    RowSectorTrackerComponent,
    ChartTimelineComponent
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
    SectorTrackerTileComponent,
    SAndPTrackerTileComponent,
    FundBannerComponent,
    FundChartingComponent,
    FundNewsComponent,
    FundDonutComponent,
    TrackerTilesComponent,
    TrackerChartingComponent,
    TrackerDocumentsComponent,
    PanelComponent,
    AccordionComponent,
    SelectorSectorChartComponent,
    RowSectorTrackerComponent,
    ChartTimelineComponent
  ]
})
export class ComponentsModule { }
