import { Component } from '@angular/core';

/**
 * Generated class for the SAndPTrackerComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
@Component({
  selector: 's-and-p-tracker',
  templateUrl: 's-and-p-tracker.html'
})
export class SAndPTrackerComponent {

  text: string;

  constructor() {
    console.log('Hello SAndPTrackerComponent Component');
    this.text = 'Hello World';
  }

}
