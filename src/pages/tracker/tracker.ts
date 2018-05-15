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

  sectorTrackers: SectorTracker[] = [];
  fundPropertiesPage = FundPropertiesPage;
  sAndPTracker = new SectorTracker();

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

        var index = 0;
        for (index = 0; index < this.sectorTrackers.length; index++) {
          if (this.sectorTrackers[index].symbol === null) {
            this.sectorTrackers[index].symbol = "S&P\n500";
            this.sAndPTracker = this.sectorTrackers[index];
            break;
          }
        }
        if (index < this.sectorTrackers.length) {
          this.sectorTrackers.splice(index, 1);
        }

      });
  }

  getSymbolParam(symbol: string) {
    let symbolParam: any = {};
    symbolParam.symbol = symbol;
    return symbolParam;
  }

}
