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
  changedDisclaimer:any;
  str:string;
  
  constructor(private sectorSpdrService: SectorSpdrService, public navCtrl: NavController, public navParams: NavParams) {
    this.symbol=navParams.get("sectorsymbol");
    this.sectorName=navParams.get("sectorname");
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad HowToPurchasePage');
    console.log(this.sectorName);
    console.log(this.symbol);
    this.changedDisclaimer= document.getElementsByClassName("disclaimer")[0].innerHTML;
    this.str=this.changedDisclaimer.replace('{sectorname}',this.sectorName);

  }

  ngOnInit() {
      this.sectorSpdrService.getDisclaimerContent('How To Purchase (Mobile)')
      .subscribe(resp => {
        this.generalDisclaimer = resp;
        });

  }

}
