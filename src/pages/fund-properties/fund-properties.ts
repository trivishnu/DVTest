import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams, Slides } from 'ionic-angular';
import { SectorSpdrService } from '../../providers/SectorSpdrAPI';

const sections: string[] = [
  "Snapshot",
  "Holdings",
  "Distributions",
  "Performance",
  "Charting",
  "Discount",
  "News",
  "Resources"
];

@IonicPage()
@Component({
  selector: 'page-fund-properties',
  templateUrl: 'fund-properties.html',
})
export class FundPropertiesPage {
  @ViewChild(Slides) slides: Slides;

  sectorSymbol: string;
  symbolColorClass: string;
  sectorSection: string = "";
  titleClass: string = "";
  sectorBackgroundClass
  : string;

  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    private sectorSpdrService: SectorSpdrService) {
    this.sectorSymbol = this.navParams.get('symbol');
    this.symbolColorClass = this.sectorSymbol.toLowerCase();
    this.sectorBackgroundClass = this.symbolColorClass + "-background";
    this.sectorSection = sections[0];
  }

  ionViewWillEnter() {
    var elements = document.getElementsByClassName('swiper-pagination-bullet') as HTMLCollectionOf<HTMLElement>;
    for (var i = 0; i < elements.length; i++) {
      elements[i].style.backgroundColor = "" + this.sectorSpdrService.getSectorColor(this.sectorSymbol);
    }
  }

  slideWillChange() {
    let currentIndex = this.slides.getActiveIndex();
    if (currentIndex >= 0 && currentIndex < sections.length) {
      this.titleTransition(sections[currentIndex]);
    }
  }

  titleTransition(section: string) {
    this.titleClass = "animated fadeOutUp";
    setTimeout(() => { this.sectorSection = section; }, 300)
    setTimeout(() => { this.titleClass = "animated fadeInDown"; }, 300);
  }

}
