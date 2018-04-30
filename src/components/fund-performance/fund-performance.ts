import { Component, Input } from '@angular/core';
import { SectorSpdrService, FundPerformances } from '../../providers/SectorSpdrAPI';
import { FundPerformance } from '../../providers/SectorSpdrAPI/models/fund-performance';
import { Console } from '@angular/core/src/console';

/**
 * Generated class for the FundPerformanceComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
@Component({
  selector: 'fund-performance',
  templateUrl: 'fund-performance.html'
})
export class FundPerformanceComponent {


  @Input() symbol : string;
  performances : FundPerformances;
  quarterEndPerformances: FundPerformances;
  monthEndPerformances: FundPerformances;
  performanceTypeIndex : number = 0;
  performanceTypes : string[] = [];
  selectedPerformance : FundPerformance;
  performancePeriod : string = "Quarter";

  constructor(private sectorSpdrService: SectorSpdrService) {
  }

  ngOnInit() {

    this.sectorSpdrService.getQuarterEndPerformances(this.symbol)
    .subscribe(resp => {
      this.quarterEndPerformances = resp;

      if( this.quarterEndPerformances.performances.length > 0 ) {
        for( var i=0 ; i<this.quarterEndPerformances.performances.length ; i++ ) {
          var performance = this.quarterEndPerformances.performances[i];
          var performanceType = "";
          if( performance.liquidationType == null ) {
              performanceType = "Total Returns";
          }
          else {
            performanceType = performance.liquidationType;
          }
          performanceType = performanceType.concat(" (" + performance.totalReturnType + ")" );
          this.performanceTypes.push(performanceType);
        }
        console.log("Performance Types", this.performanceTypes);

        if( this.performancePeriod == "Quarter" ) {
          this.performances = this.quarterEndPerformances;
          this.selectedPerformance = this.performances.performances[this.performanceTypeIndex];
        }
      }

    });

    this.sectorSpdrService.getMonthEndPerformances(this.symbol)
    .subscribe(resp => {
      this.monthEndPerformances = resp;

      if( this.monthEndPerformances.performances.length > 0 ) {
        for( var i=0 ; i<this.monthEndPerformances.performances.length ; i++ ) {
          var performance = this.monthEndPerformances.performances[i];
          var performanceType = "";
          if( performance.liquidationType == null ) {
              performanceType = "Total Returns";
          }
          else {
            performanceType = performance.liquidationType;
          }
          performanceType = performanceType.concat(" (" + performance.totalReturnType + ")" );
          this.performanceTypes.push(performanceType);
        }

        if( this.performancePeriod == "Month" ) {
          this.performances = this.monthEndPerformances;
          this.selectedPerformance = this.performances.performances[this.performanceTypeIndex];
        }
      }

    });

  }
  
  onPerformanceTypeChange(val: any) {
    this.selectedPerformance = this.performances.performances[this.performanceTypeIndex];
  }

  onPerformancePeriodChange() {
    if( this.performancePeriod == "Quarter" ) {
      this.performances = this.quarterEndPerformances;
    }
    else if( this.performancePeriod == "Month" ) {
      this.performances = this.monthEndPerformances;
    }
    this.selectedPerformance = this.performances.performances[this.performanceTypeIndex];
  }

}
