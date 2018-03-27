import { Component } from '@angular/core';
import { SectorSpdrService, FundSnapshot } from '../../providers/SectorSpdrAPI';

/**
 * Generated class for the FundSnapshotComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
@Component({
  selector: 'fund-snapshot',
  templateUrl: 'fund-snapshot.html'
})
export class FundSnapshotComponent {

  symbol : string;

  marketCap: string;
  sharesOutstanding: string;
  exchange: string;
  averageVolume: string;
  index: string;
  indexValue: string;
  indexDividend: string;
  indexDividendYield: string;
  previousClose : string;
  fiftyTwoWeekHigh : string;
  fiftyTwoWeekLow : string;

  constructor(private sectorSpdrService: SectorSpdrService) {

    this.symbol = 'XLE';

  }

  ngOnInit() {

    this.sectorSpdrService.getSnapshot(this.symbol)
    .subscribe(resp => {
      this.updateFields(resp);
    });

  }

  updateFields(snapshot : FundSnapshot) {

    this.marketCap = snapshot.marketCap;
    this.sharesOutstanding = snapshot.sharesOutstanding;
    this.exchange = snapshot.exchange;
    this.averageVolume = snapshot.averageVolume;
    this.index = snapshot.index;
    this.indexValue = snapshot.indexValue;
    this.indexDividend = snapshot.indexDividend;
    this.indexDividendYield = snapshot.indexDividendYield;
    this.previousClose = snapshot.previousClose;
    this.fiftyTwoWeekHigh = snapshot.fiftyTwoWeekHigh;
    this.fiftyTwoWeekLow = snapshot.fiftyTwoWeekLow;

  }

}
