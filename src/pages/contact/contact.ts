import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { SectorSpdrService } from '../../providers/SectorSpdrAPI';

@Component({
  selector: 'page-contact',
  templateUrl: 'contact.html'
})
export class ContactPage {

  generalDisclaimer: string;

  constructor(public navCtrl: NavController, private sectorSpdrService: SectorSpdrService) {

  }
  ngOnInit() {
    this.sectorSpdrService.getDisclaimerContent('Home Page Disclosure (Mobile)')
      .subscribe(resp => {
        this.generalDisclaimer = resp;
      });
  }
}
