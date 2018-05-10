import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { SectorSpdrService } from '../../providers/SectorSpdrAPI';

@IonicPage()
@Component({
  selector: 'page-fund-properties',
  templateUrl: 'fund-properties.html',
})
export class FundPropertiesPage {

  sectorSymbol: string;

  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    private sectorSpdrService: SectorSpdrService) {
  }

  ionViewWillEnter() {
    var elements = document.getElementsByClassName('swiper-pagination-bullet') as HTMLCollectionOf<HTMLElement>;
    for (var i = 0; i < elements.length; i++) {
      elements[i].style.backgroundColor = ""  + this.sectorSpdrService.getSectorColor(this.sectorSymbol);
    }
  }

  ngOnInit() {
    this.sectorSymbol = this.navParams.data;
  }

}
