import { Component, Input } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { SectorSpdrService } from '../../providers/SectorSpdrAPI';


@IonicPage()
@Component({
  selector: 'page-how-to-purchase',
  templateUrl: 'how-to-purchase.html',
})
export class HowToPurchasePage {

  symbol: string;
  sectorName: string;
  generalDisclaimer: string;
  changedDisclaimer: string;

  constructor(private sectorSpdrService: SectorSpdrService, public navCtrl: NavController, public navParams: NavParams) {
    this.symbol = this.navParams.get("sectorSymbol");
    this.sectorName = this.navParams.get("sectorName");
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad HowToPurchasePage');
  }

  ngOnInit() {
    this.sectorSpdrService.getDisclaimerContent('How To Purchase (Mobile)')
      .subscribe(resp => {
        this.generalDisclaimer = resp;
      });
    this.changedDisclaimer = this.generalDisclaimer.replace('{sectorname}', this.sectorName);
    this.changedDisclaimer = this.changedDisclaimer.replace('{sectorsymbol}', this.symbol);

  }

}
