import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { SectorSpdrService, FundPerformances } from '../../providers/SectorSpdrAPI';


@IonicPage()
@Component({
  selector: 'page-all-funds-performance',
  templateUrl: 'all-funds-performance.html',
})
export class AllFundsPerformancePage {

  performancePeriod : string = "quarter";
  performanceTypeIndex : string = "1";
  fundPerformances : FundPerformances;
  expenseRatio : number;

  constructor(public navCtrl: NavController, public navParams: NavParams, private sectorSpdrService: SectorSpdrService) {
  }

  ngOnInit() {

    this.sectorSpdrService.getExpenseRatio()
    .subscribe(resp => {
      this.expenseRatio = resp as number;
      console.log(this.expenseRatio);
    });

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
