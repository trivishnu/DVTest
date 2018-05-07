import { Component, Input } from '@angular/core';
import { SectorSpdrService, PremiumDistribution, YearPremium } from '../../providers/SectorSpdrAPI';


@Component({
  selector: 'fund-premiums',
  templateUrl: 'fund-premiums.html'
})
export class FundPremiumsComponent {

  @Input() symbol : string;
  distributions: PremiumDistribution;
  distributionYearIndex = 0;
  selectedYear: YearPremium;

  constructor(private sectorSpdrService: SectorSpdrService) {
  }

  ngOnInit() {

    this.sectorSpdrService.getPremiumDiscountFrequencyDistributions(this.symbol)
    .subscribe(resp => {

      this.distributions = resp;
      this.selectedYear = this.distributions.years[this.distributionYearIndex];

    });
  }


  distributionYearChange(val: any) {
    this.selectedYear = this.distributions.years[this.distributionYearIndex];
  }

}
