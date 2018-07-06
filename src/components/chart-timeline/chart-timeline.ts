import { Component, Input, Output, EventEmitter } from '@angular/core';

/**
 * Generated class for the ChartTimelineComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
@Component({
  selector: 'chart-timeline',
  templateUrl: 'chart-timeline.html'
})
export class ChartTimelineComponent {

  @Input() sector: string;
  @Output() timeLineChanged = new EventEmitter();

  timelineType: string = "Today";

  constructor() {

  }


  onSelectionChange(value) {

    this.timeLineChanged.emit(value);

  }

}
