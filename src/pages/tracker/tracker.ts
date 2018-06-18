import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

import { SectorSpdrService, SectorTracker } from '../../providers/SectorSpdrAPI'

import { FundPropertiesPage } from '../fund-properties/fund-properties';


@IonicPage()
@Component({
  selector: 'page-tracker',
  templateUrl: 'tracker.html',
})
export class TrackerPage {
  public lastUpdateTime: Date;

  constructor() {
  }

  slideWillChange() {

  }

  ionViewWillEnter() {
    this.lastUpdateTime = new Date(Date.now());
    
    var elements = document.getElementsByClassName('swiper-pagination-bullet') as HTMLCollectionOf<HTMLElement>;
    for (var i = 0; i < elements.length; i++) {
      elements[i].style.backgroundColor = "#2B7AD7";
    }
  }

}
