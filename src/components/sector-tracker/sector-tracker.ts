import { Component, Input, EventEmitter, Output } from '@angular/core';
import { SectorTracker, SectorSpdrService } from '../../providers/SectorSpdrAPI';

const IMAGES_ASSETS_PATH = 'assets/imgs/';

@Component({
  selector: 'sector-tracker',
  templateUrl: 'sector-tracker.html'
})
export class SectorTrackerComponent {

  @Input() tracker: SectorTracker;
  @Output() trackerSelected = new EventEmitter();

  color = "#000000";
  icon = '';
  changeGraphics = '';
  changePercent: string;

  text: string;

  constructor(private sectorSpdrService:SectorSpdrService) {
  }

  ngOnInit() {
    this.color = this.sectorSpdrService.getSectorColor(this.tracker.symbol);
    this.icon = IMAGES_ASSETS_PATH + this.sectorSpdrService.getSectorIcon(this.tracker.symbol) + '.svg';

    console.log(this.tracker.changePercent);
    if(  this.tracker.changePercent >  0.0 )
      this.changeGraphics = IMAGES_ASSETS_PATH + 'green_button_arrowup.svg';
    else if(  this.tracker.changePercent <  0.0 )
      this.changeGraphics = IMAGES_ASSETS_PATH + 'red_button_arrowdown.svg';

      var changeSign = "";
      if (this.tracker.changePercent > 0) {
        changeSign = "+";
      }
      else if (this.tracker.changePercent < 0) {
        changeSign = "-";
      }
      this.changePercent = changeSign + Math.abs(this.tracker.changePercent).toFixed(2) + "%";
    
  }

  trackerTapped() {
    this.trackerSelected.emit(this.tracker.symbol);
  }

}
