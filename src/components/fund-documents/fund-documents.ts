import { Component, Input } from '@angular/core';
import { SectorSpdrService, FundDocument } from '../../providers/SectorSpdrAPI';
import { DocumentViewPage } from '../../pages/document-view/document-view';
import { NavController } from 'ionic-angular';

/**
 * Generated class for the FundDocumentsComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
@Component({
  selector: 'fund-documents',
  templateUrl: 'fund-documents.html'
})
export class FundDocumentsComponent {

  @Input() symbol : string;

  documents : FundDocument[] = [];
  documentViewPage = DocumentViewPage;

  constructor(public navCtrl: NavController, private sectorSpdrService: SectorSpdrService) {
  }

  ngOnInit() {

    this.sectorSpdrService.getFundDocuments(this.symbol)
    .subscribe(resp => 
      this.documents = resp
    );

  }

  documentSelected(document : FundDocument) {

    this.navCtrl.push(DocumentViewPage, {
      title: document.title,
      url: document.url
    });

  }

}
