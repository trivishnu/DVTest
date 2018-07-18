import { Component, Input } from '@angular/core';
import { SectorSpdrService, FundPerformances } from '../../providers/SectorSpdrAPI';
import { FundPerformance } from '../../providers/SectorSpdrAPI/models/fund-performance';


@Component({
  selector: 'fund-performance',
  templateUrl: 'fund-performance.html'
})
export class FundPerformanceComponent {


  @Input() symbol: string;
  quarterEndPerformances: FundPerformances;
  monthEndPerformances: FundPerformances;
  performanceTypes: string[] = [];
  selectedPerformances: FundPerformance[];
  performancePeriod: string = "Month";
  performanceDate: string = "";
  generalDisclaimer: string;
  additionalDisclaimer: string;


  constructor(private sectorSpdrService: SectorSpdrService) {

    this.performanceTypes.push("Total Returns(Net Asset Value)");
    this.performanceTypes.push("Total Returns(Market Close)");
    this.performanceTypes.push("After-Tax Pre-Liquidation Total Returns (Net Asset Value)");
    this.performanceTypes.push("After-Tax Post-Liquidation Total Returns (Net Asset Value)");

  }

  ngOnInit() {
    this.sectorSpdrService.getMonthEndPerformances(this.symbol)
      .subscribe(resp => {
        this.monthEndPerformances = resp;
        if (this.monthEndPerformances.performances.length > 0) {
          if (this.performancePeriod == "Month") {
            this.setSelectedPerformances(this.monthEndPerformances.performances);
            this.performanceDate = "(" + this.monthEndPerformances.asOfDate + ")";
          }
        }

      });

    this.sectorSpdrService.getQuarterEndPerformances(this.symbol)
      .subscribe(resp => {
        this.quarterEndPerformances = resp;
        if (this.quarterEndPerformances.performances.length > 0) {
          if (this.performancePeriod == "Quarter") {
            this.setSelectedPerformances(this.quarterEndPerformances.performances);
            this.performanceDate = "(" + this.quarterEndPerformances.asOfDate + ")";
          }
        }
      });

    this.sectorSpdrService.getDisclaimerContent('Performance Pages Disclosure (Mobile)')
      .subscribe(resp => {
        this.additionalDisclaimer = resp;
      });

    this.sectorSpdrService.getDisclaimerContent('Home Page Disclosure (Mobile)')
      .subscribe(resp => {
        this.generalDisclaimer = resp;
      });
  }

  setSelectedPerformances(performances: FundPerformance[]) {

    this.selectedPerformances = [];
    for (var i = 0; i < performances.length; i++) {
      var performance = performances[i];
      this.selectedPerformances.push(performance);
    }

  }

  onPerformancePeriodChange() {

    if (this.performancePeriod == "Quarter") {
      this.setSelectedPerformances(this.quarterEndPerformances.performances);
      this.performanceDate = "(" + this.quarterEndPerformances.asOfDate + ")";
    }
    else if (this.performancePeriod == "Month") {
      this.setSelectedPerformances(this.monthEndPerformances.performances);
      this.performanceDate = "(" + this.monthEndPerformances.asOfDate + ")";
    }
  }

}
