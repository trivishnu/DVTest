import { Component } from '@angular/core';
import { SectorSpdrService } from '../../providers/SectorSpdrAPI'

@Component({
  selector: 'tracker-documents',
  templateUrl: 'tracker-documents.html'
})
export class TrackerDocumentsComponent {

  text: string;
  generalDisclaimer: string;

  constructor(private sectorSpdrService: SectorSpdrService) {
    this.text = 'Document Component';
  }
  
  ngOnInit() {
    this.sectorSpdrService.getDisclaimerContent('Home Page Disclosure (Mobile)')
      .subscribe(resp => {
        this.generalDisclaimer = resp;
      });
  }

}
