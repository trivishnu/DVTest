import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { SectorSpdrService, FundPerformances } from '../../providers/SectorSpdrAPI';

/**
 * Generated class for the AllFundsPerformancePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-all-funds-performance',
  templateUrl: 'all-funds-performance.html',
})
export class AllFundsPerformancePage {

  performancePeriod : string = "quarter";
  performanceTypeIndex : string = "1";
  fundPerformances : FundPerformances;

  constructor(public navCtrl: NavController, public navParams: NavParams, private sectorSpdrService: SectorSpdrService) {
  }

  ionViewDidLoad() {
    this.updatePerformanceData();
  }

  onPerformancePeriodChange() {
    this.updatePerformanceData();
  }

    
  onPerformanceTypeChange(val: any) {
    this.updatePerformanceData();
  }

  updatePerformanceData() {


    this.sectorSpdrService.getAllFundsPerformance(parseInt(this.performanceTypeIndex), this.performancePeriod)
    .subscribe(resp => {
      this.fundPerformances = resp;
    });

  }

}
