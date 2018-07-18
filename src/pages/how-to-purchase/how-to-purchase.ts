import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { SectorSpdrService } from '../../providers/SectorSpdrAPI';


@IonicPage()
@Component({
  selector: 'page-how-to-purchase',
  templateUrl: 'how-to-purchase.html',
})
export class HowToPurchasePage {
	
  	
  generalDisclaimer: string;

  constructor(private sectorSpdrService: SectorSpdrService,public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad HowToPurchasePage');
  }
  ngOnInit() {
	    this.generalDisclaimer = this.sectorSpdrService.getDisclaimerCotent('How To Purchase (Mobile)');
       
   }

}
