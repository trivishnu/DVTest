import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

import { SectorSpdrService, SectorTracker } from '../../providers/SectorSpdrAPI'

import { FundPropertiesPage } from '../fund-properties/fund-properties';


@IonicPage()
@Component({
  selector: 'page-tracker',
  templateUrl: 'tracker.html',
})
export class TrackerPage {

  sectorTrackers: SectorTracker[] = [];
  sAndPTracker = new SectorTracker();
  rows: number[];

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private sectorSpdrService: SectorSpdrService) {
  }

  ionViewWillEnter() {
    this.sectorSpdrService.initialize();

    this.sectorSpdrService.getSectorTracker("1D")
      .subscribe(resp => {
        this.sectorTrackers = resp;

        this.rows = Array.from(Array(Math.ceil(this.sectorTrackers.length / 2)).keys())

        let index = 0;
        for (index = 0; index < this.sectorTrackers.length; index++) {
          if (this.sectorTrackers[index].symbol === null) {
            this.sectorTrackers[index].symbol = "";
            this.sAndPTracker = this.sectorTrackers[index];
            break;
          }
        }

        const xlcSector = new SectorTracker();
        xlcSector.symbol = "XLC";
        xlcSector.displayName = "Communication Services"
        xlcSector.change = "0.0";
        xlcSector.changePercent = 0.0;

        this.sectorTrackers.push(xlcSector);

        var sAndP = this.sectorTrackers.shift();
        this.sectorTrackers.sort(this.comparePerformance).reverse();
        this.sectorTrackers.unshift(sAndP);

      });
  }

  getSymbolParam(symbol: string) {
    let symbolParam: any = {};
    symbolParam.symbol = symbol;
    return symbolParam;
  }

  handleTrackerSelected(symbol) {
    this.navCtrl.push(FundPropertiesPage, this.getSymbolParam(symbol));
  }

  comparePerformance(a :SectorTracker,b : SectorTracker) {
    if (a.changePercent < b.changePercent)
      return -1;
    if (a.changePercent > b.changePercent)
      return 1;
    return 0;
  }

}
