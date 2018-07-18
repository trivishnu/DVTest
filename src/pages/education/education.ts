import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { DetailPage } from '../detail/detail';
import { SectorSpdrService } from '../../providers/SectorSpdrAPI';

@IonicPage()
@Component({
  selector: 'page-education',
  templateUrl: 'education.html',
})
export class EducationPage {


  generalDisclaimer: string;


  constructor(private sectorSpdrService: SectorSpdrService) {
  }

  ngOnInit() {
    this.sectorSpdrService.getDisclaimerContent('Home Page Disclosure (Mobile)')
      .subscribe(resp => {
        this.generalDisclaimer = resp;
      });
  }
}
