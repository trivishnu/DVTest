import { Component, Input } from '@angular/core';
import { FundDetails } from '../../providers/SectorSpdrAPI';
import { SectorSpdrService } from '../../providers/SectorSpdrAPI';


@Component({
  selector: 'fund-charting',
  templateUrl: 'fund-charting.html'
})
export class FundChartingComponent {

  @Input() symbol: string;

  distributionFrequency: string;
  expenseRatio: string;
  numberOfStocks: string;
  shortSelling: string;
  options: string;

  sectorName: string;
  description: string;
  weight: number;

  constructor(private sectorSpdrService: SectorSpdrService) {
  }

  ngOnInit() {
    this.sectorSpdrService.getFundDetails(this.symbol)
      .subscribe(resp => {
        this.updateFields(resp);
      });

    var sector = this.sectorSpdrService.getSectorInfo(this.symbol);
    this.sectorName = sector.sectorName;
    this.description = sector.description;
    this.weight = sector.weight;
  }

  updateFields(fundDetails: FundDetails) {
    this.distributionFrequency = fundDetails.distributionFrequency;
    this.expenseRatio = Number(fundDetails.expenseRatio).toFixed(2) + '%';
    this.numberOfStocks = fundDetails.numberOfStocks.toString();
    this.shortSelling = fundDetails.shortSelling ? 'Yes' : 'No';
    this.options = fundDetails.options ? 'Yes' : 'No';
  }

}
