import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams, Slides } from 'ionic-angular';
import { SectorSpdrService } from '../../providers/SectorSpdrAPI';

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

  slideWillChange() {
    let currentIndex = this.slides.getActiveIndex();
    switch (currentIndex) {
      case 0:
        this.titleTransition("Details");
        break;
      case 1:
        this.titleTransition("Profile");
        break;
      case 2:
        this.titleTransition("Snapshot");
        break;
      case 3:
        this.titleTransition("Daily Calculation");
        break;
      case 4:
        this.titleTransition("Holdings");
        break;
      case 5:
        this.titleTransition("Distributions");
        break;
      case 6:
        this.titleTransition("Documents");
        break;
      case 7:
        this.titleTransition("Performance");
        break;
      case 8:
        this.titleTransition("Premiums");
        break;
      default:
    }
  }

  titleTransition(section: string) {
    this.titleClass = "animated fadeOutUp";
    setTimeout(() => { this.sectorSection = section; }, 300)
    setTimeout(() => { this.titleClass = "animated fadeInDown"; }, 300);
  }

}
