import { Component } from '@angular/core';
import { SectorSpdrService } from '../../providers/SectorSpdrAPI'

@Component({
  selector: 'tracker-documents',
  templateUrl: 'tracker-documents.html'
})
export class TrackerDocumentsComponent {

  text: string;
  generalDisclaimer: string;

  constructor( private sectorSpdrService: SectorSpdrService) {
    this.text = 'Document Component';
  }
  ngOnInit() {
	   this.generalDisclaimer = this.sectorSpdrService.getDisclaimerCotent('Home Page Disclosure (Mobile)');
  }

}
