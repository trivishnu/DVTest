import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';


@IonicPage()
@Component({
  selector: 'page-fund-properties',
  templateUrl: 'fund-properties.html',
})
export class FundPropertiesPage {

  sectorSymbol : string;

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

//   ionViewDidLoad() {
// //    this.sector = this.navParams.get('sector');
//     this.sector = this.navParams.data;
//     console.log('Fund Properties - sector', this.sector);
//   }

  ngOnInit() {
    this.sectorSymbol = this.navParams.data;
  }
    
}
