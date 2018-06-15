import { Component } from '@angular/core';

@Component({
  selector: 'tracker-documents',
  templateUrl: 'tracker-documents.html'
})
export class TrackerDocumentsComponent {

  text: string;

  constructor() {
    this.text = 'Document Component';
  }

}
