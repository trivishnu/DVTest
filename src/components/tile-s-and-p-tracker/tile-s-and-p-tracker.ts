import { Component, EventEmitter, Input, Output } from '@angular/core';
import { SectorTracker } from '../../providers/SectorSpdrAPI';
import { QuoteService } from '../../providers/FinancialAPI';

import { FINANCIAL_API_SERVER, API_KEY, S_AND_P_ID_NOTATION } from '../../config/config';

const IMAGES_ASSETS_PATH = 'assets/imgs/';

@Component({
  selector: 'tile-s-and-p-tracker',
  templateUrl: 'tile-s-and-p-tracker.html'
})
export class SAndPTrackerTileComponent {

  @Input() tracker: SectorTracker;
  @Output() sAndP500Selected = new EventEmitter();

  changeGraphics = '';
  lastValue = 0.0;

  constructor(private quoteService: QuoteService) {

  }

  ngOnInit() {

    this.quoteService.setConfiguration(FINANCIAL_API_SERVER, API_KEY);
    this.quoteService.getSnapQuotes(S_AND_P_ID_NOTATION, "SectorSpdr")
      .subscribe(resp => {
        if (resp.data.length > 0) {
          var quote = resp.data[0];
          if (quote.valid !== false) {
            this.lastValue = quote.last;
          }
        }
      });

    if (this.tracker.changePercent > 0.0) {
      this.changeGraphics = IMAGES_ASSETS_PATH + 'green_button_arrowup.svg';
    }
    else if (this.tracker.changePercent < 0.0) {
      this.changeGraphics = IMAGES_ASSETS_PATH + 'red_button_arrowdown.svg';
    }

  }

  sAndP500Tapped() {
    this.sAndP500Selected.emit();
  }

}
