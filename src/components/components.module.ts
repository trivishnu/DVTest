import { NgModule } from '@angular/core';
import { FundDetailsComponent } from './fund-details/fund-details';
import { FundHoldingsComponent } from './fund-holdings/fund-holdings';
import { FundProfileComponent } from './fund-profile/fund-profile';
import { FundSnapshotComponent } from './fund-snapshot/fund-snapshot';
import { FiftyTwoWeeksChartComponent } from './fifty-two-weeks-chart/fifty-two-weeks-chart';
import { FundDistributionComponent } from './fund-distribution/fund-distribution';
import { FundDocumentsComponent } from './fund-documents/fund-documents';
import { FundPerformanceComponent } from './fund-performance/fund-performance';
import { FundDailyCalculationComponent } from './fund-daily-calculation/fund-daily-calculation';

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
    FundDailyCalculationComponent
    ],
	imports: [],
	exports: [
        FundDetailsComponent,
        FundHoldingsComponent,
        FundProfileComponent,
        FundSnapshotComponent,
        FiftyTwoWeeksChartComponent,
        FundDistributionComponent,
        FundDocumentsComponent,
    FundPerformanceComponent,
    FundDailyCalculationComponent
    ]
})
export class ComponentsModule {}
