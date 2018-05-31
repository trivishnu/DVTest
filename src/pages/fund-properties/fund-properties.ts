import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams, Slides } from 'ionic-angular';
import { SectorSpdrService } from '../../providers/SectorSpdrAPI';

@Component({
  selector: 'page-fund-properties',
  templateUrl: 'fund-properties.html',
})
export class FundPropertiesPage {
  @ViewChild(Slides) slides: Slides;

  sectorSymbol: string;
  symbolColorClass: string;
  sectorSection: string = "";

  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    private sectorSpdrService: SectorSpdrService) {
    this.sectorSymbol = this.navParams.get('symbol');
    this.symbolColorClass = this.sectorSymbol.toLowerCase();
    this.sectorSection = "Details";
  }

  ionViewWillEnter() {
    var elements = document.getElementsByClassName('swiper-pagination-bullet') as HTMLCollectionOf<HTMLElement>;
    for (var i = 0; i < elements.length; i++) {
      elements[i].style.backgroundColor = "" + this.sectorSpdrService.getSectorColor(this.sectorSymbol);
    }
  }

  slideChanged() {
    let currentIndex = this.slides.getActiveIndex();
    switch (currentIndex) {
      case 0:
        this.sectorSection = "Details";
        break;
      case 1:
        this.sectorSection = "Profile";
        break;
      case 2:
        this.sectorSection = "Snapshot";
        break;
      case 3:
        this.sectorSection = "Daily Calculation";
        break;
      case 4:
        this.sectorSection = "Holdings";
        break;
      case 5:
        this.sectorSection = "Distributions";
        break;
      case 6:
        this.sectorSection = "Documents";
        break;
      case 7:
        this.sectorSection = "Performance";
        break;
      case 8:
        this.sectorSection = "Premiums";
        break;
      default:
    }
  }

}
