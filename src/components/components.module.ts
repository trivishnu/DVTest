import { NgModule } from '@angular/core';
import { FundDetailsComponent } from './fund-details/fund-details';
import { FundHoldingsComponent } from './fund-holdings/fund-holdings';
import { FundProfileComponent } from './fund-profile/fund-profile';
import { FundSnapshotComponent } from './fund-snapshot/fund-snapshot';
import { FiftyTwoWeeksChartComponent } from './fifty-two-weeks-chart/fifty-two-weeks-chart';
import { FundDistributionComponent } from './fund-distribution/fund-distribution';
@NgModule({
	declarations: [FundDetailsComponent,
    FundHoldingsComponent,
    FundProfileComponent,
    FundSnapshotComponent,
    FiftyTwoWeeksChartComponent,
    FundDistributionComponent],
	imports: [],
	exports: [FundDetailsComponent,
    FundHoldingsComponent,
    FundProfileComponent,
    FundSnapshotComponent,
    FiftyTwoWeeksChartComponent,
    FundDistributionComponent]
})
export class ComponentsModule {}
