import { Component, Input } from '@angular/core';
import { NavController } from 'ionic-angular';
import { FundDetails } from '../../providers/SectorSpdrAPI';
import { SectorSpdrService } from '../../providers/SectorSpdrAPI';
import { HowToPurchasePage } from '../../pages/how-to-purchase/how-to-purchase';

@Component({
  selector: 'fund-details',
  templateUrl: 'fund-details.html'
})
export class FundDetailsComponent {

  @Input() symbol: string;

  distributionFrequency: string;
  expenseRatio: number;
  numberOfStocks: string;
  shortSelling: string;
  options: string;
  sectorDividerClass: string;
  sectorButtonClass: string;
  sectorColor: string;
  sectorName: string;
  description: string;
  weight: number;

  constructor(private sectorSpdrService: SectorSpdrService,
    private navCtrl: NavController) {
  }

  ngOnInit() {
    this.sectorColor = this.sectorSpdrService.getSectorColor(this.symbol);

    this.sectorSpdrService.getFundDetails(this.symbol)
      .subscribe(resp => {
        this.updateFields(resp);
      });

    var sector = this.sectorSpdrService.getSectorInfo(this.symbol);
    if (sector !== undefined) {
      this.sectorName = sector.sectorName;
      this.description = sector.description;
      this.weight = sector.weight;
    }

    this.sectorDividerClass = this.symbol.toLowerCase() + '-divider';
    this.sectorButtonClass = this.symbol.toLowerCase() + '-border';
  }

  updateFields(fundDetails: FundDetails) {
    if (fundDetails !== undefined) {
      this.distributionFrequency = fundDetails.distributionFrequency;
      this.expenseRatio = fundDetails.expenseRatio;
      if (fundDetails.numberOfStocks !== null) {
        this.numberOfStocks = fundDetails.numberOfStocks.toString();
      }
      this.shortSelling = fundDetails.shortSelling ? 'Yes' : 'No';
      this.options = fundDetails.options ? 'Yes' : 'No';
    }
  }

  howToPurchase() {
    this.navCtrl.push(HowToPurchasePage);
  }

}
