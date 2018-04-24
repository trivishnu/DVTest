import { Component, Input } from '@angular/core';

import { SectorSpdrService, Holding, SectorHoldings } from '../../providers/SectorSpdrAPI';
import { SECTOR_SPDR_SERVER } from '../../config/config';

/**
 * Generated class for the FundHoldingsComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
@Component({
  selector: 'fund-holdings',
  templateUrl: 'fund-holdings.html'
})
export class FundHoldingsComponent {

  @Input() symbol : string;

  asOfDate : string;
  asOfTime : string;
  holdings : Holding[] = [];

  groceries: String[];

  constructor(private sectorSpdrService: SectorSpdrService) {
    sectorSpdrService.setConfiguration(SECTOR_SPDR_SERVER);
  }

  ngOnInit() {

    this.sectorSpdrService.getFundHoldings(this.symbol)
    .subscribe(resp => {
      this.updateFields(resp);
    });

  }


  updateFields(sectorHoldings : SectorHoldings) {

    this.asOfDate = sectorHoldings.asOfDate;
    this.asOfTime = sectorHoldings.asOfTime;
    this.holdings = sectorHoldings.items;

  }

}
