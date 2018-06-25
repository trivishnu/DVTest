import { Component } from '@angular/core';
import { Platform, NavController, NavParams } from 'ionic-angular';
import { SectorSpdrService, SectorTracker } from '../../providers/SectorSpdrAPI';

import { FundPropertiesPage } from '../../pages/fund-properties/fund-properties';

@Component({
  selector: 'tracker-charting',
  templateUrl: 'tracker-charting.html'
})
export class TrackerChartingComponent {

  sectors : string[] = [ "", "XLB", "XLC", "XLE", "XLF", "XLI", "XLK", "XLP", "XLRE", "XLU", "XLV", "XLY" ];
  rows: number[];
  text: string;
  initialSelectedState = true;
  // sectorTrackers: SectorTracker[] = [];
  selectedSectors: string[] = [];

  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    private sectorSpdrService: SectorSpdrService,
    private platform: Platform) {
  }

  
  ngOnInit() {
    this.platform.ready().then(() => {
      this.initialize();
    });
  }

  initialize() {

    this.rows = Array.from(Array(Math.ceil(this.sectors.length / 3)).keys())

    if( this.initialSelectedState ) {
      this.selectedSectors = this.sectors.map(obj => obj);
      this.selectedSectors.shift();
    }

    this.sectorSpdrService.initialize();
  }

  handleSectorSelectionChange(changeInfo) {

    if( changeInfo.selected )
      this.addToSelectedSectors(changeInfo.symbol);
    else
      this.removeFromSelectedSectors(changeInfo.symbol);

  }

  compareSymbol(a: SectorTracker, b: SectorTracker) {
    if (a.symbol < b.symbol)
      return -1;
    if (a.symbol > b.symbol)
      return 1;
    return 0;
  }

  compareString(a: string, b: string) {
    if (a < b)
      return -1;
    if (a > b)
      return 1;
    return 0;
  }

  removeFromSelectedSectors(symbol) {
    for(var i = this.selectedSectors.length - 1; i >= 0; i--) {
      if(this.selectedSectors[i] === symbol) {
        this.selectedSectors.splice(i, 1);
        break;
      }
    }
  }

  addToSelectedSectors(symbol) {
    this.selectedSectors.push(symbol);
    this.selectedSectors.sort(this.compareString);
  }

  
  getSymbolParam(symbol: string) {
    let symbolParam: any = {};
    symbolParam.symbol = symbol;
    return symbolParam;
  }

  handleTrackerSelected(symbol) {
    this.navCtrl.push(FundPropertiesPage, this.getSymbolParam(symbol));
  }

}
