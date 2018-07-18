import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { SectorSpdrService } from '../../providers/SectorSpdrAPI';

@Component({
  selector: 'page-contact',
  templateUrl: 'contact.html'
})
export class ContactPage {

  generalDisclaimer: string;

  constructor(public navCtrl: NavController,private sectorSpdrService: SectorSpdrService) {

  }
  ngOnInit() {
  this.generalDisclaimer = this.sectorSpdrService.getDisclaimerCotent('Home Page Disclosure (Mobile)');
  }
}
