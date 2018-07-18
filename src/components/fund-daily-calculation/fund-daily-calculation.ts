import { Component, Input } from '@angular/core';
import { SectorSpdrService, DailyCalculation } from '../../providers/SectorSpdrAPI';

@Component({
  selector: 'fund-daily-calculation',
  templateUrl: 'fund-daily-calculation.html'
})
export class FundDailyCalculationComponent {

  @Input() symbol: string;

  dailyCalculation: DailyCalculation;
  generalDisclaimer: string;
  additionalDisclaimer: string;

  constructor(private sectorSpdrService: SectorSpdrService) {
  }

  ngOnInit() {
    this.sectorSpdrService.getDailyCalculation(this.symbol)
      .subscribe(resp => {
        this.dailyCalculation = resp;
      });

    this.sectorSpdrService.getDisclaimerContent('Home Page Disclosure (Mobile)')
      .subscribe(resp => {
        this.generalDisclaimer = resp;
      });

    this.sectorSpdrService.getDisclaimerContent('Premium/Discount Disclosure (Mobile)')
      .subscribe(resp => {
        this.additionalDisclaimer = resp;
      });
  }
}
