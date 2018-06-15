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

  constructor() {
  }

  slideWillChange() {

  }

  ionViewWillEnter() {
    var elements = document.getElementsByClassName('swiper-pagination-bullet') as HTMLCollectionOf<HTMLElement>;
    for (var i = 0; i < elements.length; i++) {
      elements[i].style.backgroundColor = "#2B7AD7";
    }
  }

}
