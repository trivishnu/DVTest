import { Component } from '@angular/core';

@Component({
  selector: 'tracker-charting',
  templateUrl: 'tracker-charting.html'
})
export class TrackerChartingComponent {

  text: string;

  constructor() {
    this.text = 'Charting Component';
  }

}
