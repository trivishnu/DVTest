import { Component, Input } from '@angular/core';
import { SectorSpdrService } from '../../providers/SectorSpdrAPI';
import { DividendDistribution, Dividend } from '../../providers/SectorSpdrAPI';

/**
 * Generated class for the FundDistributionComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
@Component({
  selector: 'fund-distribution',
  templateUrl: 'fund-distribution.html'
})
export class FundDistributionComponent {

  @Input() symbol : string;

  dividendDistributions: DividendDistribution[] = [];
  distributionYearIndex = 0;
  dividendYearIndex = 0;
  selectedDistribution : DividendDistribution;
  selectedDividends : Dividend[];

  constructor(private sectorSpdrService: SectorSpdrService) {

  }

  ngOnInit() {

    this.sectorSpdrService.getDividendDistributions(this.symbol)
    .subscribe(resp => {
      this.dividendDistributions = resp;

      if( this.dividendDistributions.length >  0 ) {
        this.selectedDistribution = this.dividendDistributions[this.distributionYearIndex];
        this.selectedDividends = this.dividendDistributions[this.dividendYearIndex].dividends;
      }
    });

  }

  distributionYearChange(val: any) {
    this.selectedDistribution = this.dividendDistributions[this.distributionYearIndex];
  }

  dividendYearChange(val: any) {
    if( this.dividendYearIndex == 100 ) {
      let lastFourDividends : Dividend[] = [];

      for ( var i = 0; i < this.dividendDistributions.length; i++) { 
        for ( var j = 0; j < this.dividendDistributions[i].dividends.length; j++) { 
          lastFourDividends.push(this.dividendDistributions[i].dividends[j]);
          if( lastFourDividends.length > 3) {
            break;
          }
        }
        if( lastFourDividends.length > 3) {
          break;
        }
      }

      // for ( var i = 0; i < this.dividendDistributions[0].dividends.length; i++) { 
      //   lastFourDividends.push(this.dividendDistributions[0].dividends[i]);
      // }
      // if( lastFourDividends.length < 4 && this.selectedDividends.length > 1  ) {
      //   for ( var i = 0; i < 4 - lastFourDividends.length && i < this.dividendDistributions[1].dividends.length; i++) { 
      //     lastFourDividends.push(this.dividendDistributions[0].dividends[i]);
      //   }
      // }
      this.selectedDividends = lastFourDividends;
    }
    else {
      this.selectedDividends = this.dividendDistributions[this.dividendYearIndex].dividends;
    }
  }

}
