import { Component, Input } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { SectorSpdrService } from '../../providers/SectorSpdrAPI';


@IonicPage()
@Component({
  selector: 'page-how-to-purchase',
  templateUrl: 'how-to-purchase.html',
})
export class HowToPurchasePage {

  @Input() symbol: string;
  sectorName: string;
  generalDisclaimer: string;

  constructor(private sectorSpdrService: SectorSpdrService, public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad HowToPurchasePage');

  }

  ngOnInit() {
    var sector = this.sectorSpdrService.getSectorInfo(this.symbol);
    if (sector !== undefined) {
      this.sectorName = sector.sectorName;
    }

    this.sectorSpdrService.getDisclaimerContent('How To Purchase (Mobile)')
      .subscribe(resp => {
        this.generalDisclaimer = resp;
      });

  }

}
