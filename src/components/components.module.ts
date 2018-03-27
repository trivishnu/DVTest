import { NgModule } from '@angular/core';
import { FundDetailsComponent } from './fund-details/fund-details';
import { FundHoldingsComponent } from './fund-holdings/fund-holdings';
import { FundProfileComponent } from './fund-profile/fund-profile';
import { FundSnapshotComponent } from './fund-snapshot/fund-snapshot';
@NgModule({
	declarations: [FundDetailsComponent,
    FundHoldingsComponent,
    FundProfileComponent,
    FundSnapshotComponent],
	imports: [],
	exports: [FundDetailsComponent,
    FundHoldingsComponent,
    FundProfileComponent,
    FundSnapshotComponent]
})
export class ComponentsModule {}
