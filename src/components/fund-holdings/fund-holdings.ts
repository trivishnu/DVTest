import { Component } from '@angular/core';

import { SectorSpdrService, Holding, SectorHoldings } from '../../providers/SectorSpdrAPI';

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

  symbol : string;

  asOfDate : string;
  asOfTime : string;
  holdings : Holding[] = [];

  groceries: String[];

  constructor(private sectorSpdrService: SectorSpdrService) {

    this.symbol = 'XLE';


    this.groceries = [];

    this.holdings = [];
  }

  ngOnInit() {

    this.sectorSpdrService.getFundHoldings(this.symbol)
    .subscribe(resp => {
      console.log(resp);
     this.updateFields(resp);
    });

  }


  updateFields(sectorHoldings : SectorHoldings) {

    this.asOfDate = sectorHoldings.asOfDate;
    this.asOfTime = sectorHoldings.asOfTime;
    this.holdings = sectorHoldings.items;

    console.log(this.holdings);
  }

}
