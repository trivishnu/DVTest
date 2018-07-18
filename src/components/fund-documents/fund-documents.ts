import { Component, Input } from '@angular/core';
import { SectorSpdrService, FundDocument } from '../../providers/SectorSpdrAPI';
import { DocumentViewPage } from '../../pages/document-view/document-view';
import { NavController } from 'ionic-angular';
import { InAppBrowser } from '@ionic-native/in-app-browser';

@Component({
  selector: 'fund-documents',
  templateUrl: 'fund-documents.html'
})
export class FundDocumentsComponent {

  @Input() symbol: string;
  generalDisclaimer: string;
  documents: FundDocument[] = [];
  documentViewPage = DocumentViewPage;

  constructor(public navCtrl: NavController,
    private sectorSpdrService: SectorSpdrService,
    private iab: InAppBrowser) {
  }

  ngOnInit() {
    this.sectorSpdrService.getFundDocuments(this.symbol)
      .subscribe(resp =>
        this.documents = resp
      );

    this.sectorSpdrService.getDisclaimerContent('Home Page Disclosure (Mobile)')
      .subscribe(resp => {
        this.generalDisclaimer = resp;
      });
  }

  documentSelected(document: FundDocument) {
    const browser = this.iab.create(document.url, '_blank',
      'hidenavigationbuttons=yes,location=no,closebuttoncolor=#FFFFFF,transitionstyle=fliphorizontal');
  }

}
