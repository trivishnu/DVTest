import { Component } from '@angular/core';
import { Platform } from 'ionic-angular';
import { SectorSpdrService } from '../../providers/SectorSpdrAPI'

@Component({
  selector: 'tracker-documents',
  templateUrl: 'tracker-documents.html'
})
export class TrackerDocumentsComponent {

  text: string;
  generalDisclaimer: string;

  constructor(private sectorSpdrService: SectorSpdrService,
    private platform: Platform) {
    this.text = 'Document Component';
  }

  ngOnInit() {
    this.platform.ready().then(() => {
      this.sectorSpdrService.getDisclaimerContent('Home Page Disclosure (Mobile)')
        .subscribe(resp => {
          this.generalDisclaimer = resp;
        });
    });
  }
}
