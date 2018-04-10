import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

import { SectorSpdrService, SectorTracker } from '../../providers/SectorSpdrAPI'

// import { TapticEngine } from '@ionic-native/taptic-engine';
import { FundPropertiesPage } from '../fund-properties/fund-properties';


@IonicPage()
@Component({
  selector: 'page-tracker',
  templateUrl: 'tracker.html',
})
export class TrackerPage {

  sectorTrackers : SectorTracker[] = [];
  fundPropertiesPage = FundPropertiesPage;
  sAndPTracker = new SectorTracker();

  // Doughnut
  // public doughnutChartLabels: string[] = ['Sector 1', 'Sector 2', 'Sector 3'];
  // public doughnutChartData: number[] = [350, 450, 100];
  // public doughnutChartType: string = 'doughnut';
  // public doughnutChartColors: Array<any> = [{
  //   backgroundColor: [
  //     "#b8436d",
  //     "#00d9f9",
  //     "#a4c73c"
  //   ],
  //   borderColor: [
  //     "#000000",
  //     "#000000",
  //     "#000000"
  //   ]
  // }];
  // public doughnutLegendDisplayed: boolean = false;

  // // events
  // public chartClicked(e: any): void {
  //   //console.log(e);
  //   this.taptic.selection().
  //     then(() => console.log("taptic OK")).
  //     catch(() => console.log("ERROR!"));
  // }

  // public chartHovered(e: any): void {
  //   console.log(e);
  // }

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private sectorSpdrService: SectorSpdrService) {
  }

  ionViewDidLoad() {

  }

  ionViewWillEnter() {

    this.sectorSpdrService.getSectorTracker("1D")
    .subscribe(resp => {
      this.sectorTrackers = resp;

      var index = 0;
      for( index = 0 ; index < this.sectorTrackers.length ; index++ ){
          if( this.sectorTrackers[index].symbol === null ){
            this.sectorTrackers[index].symbol = "S&P\n500";
            this.sAndPTracker = this.sectorTrackers[index];
            break;
          }
      }
      if( index < this.sectorTrackers.length ) {
        this.sectorTrackers.splice(index, 1);
      }

    });

  }

}
