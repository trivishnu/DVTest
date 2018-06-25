import { Component, Input, EventEmitter, Output } from '@angular/core';
import { SectorSpdrService } from '../../providers/SectorSpdrAPI';
import { QuoteService } from '../../providers/FinancialAPI';

import { FINANCIAL_API_SERVER, API_KEY } from '../../config/config';

const IMAGES_ASSETS_PATH = 'assets/imgs/';

@Component({
  selector: 'row-sector-tracker',
  templateUrl: 'row-sector-tracker.html'
})
export class RowSectorTrackerComponent {

  @Input() symbol: string;
  @Output() trackerSelected = new EventEmitter();

  last: number = 0;
  changePercent: number = 0;
  weight = 0;
  displayName = "";

  color = "#000000";
  icon = '';
  changeGraphics = '';
  changeClass: string = "neutral";

  text: string;

  constructor(private quoteService: QuoteService, private sectorSpdrService: SectorSpdrService) {
  }

  ngOnInit() {
    this.color = this.sectorSpdrService.getSectorColor(this.symbol);
    this.displayName = this.sectorSpdrService.getSectorName(this.symbol);
    this.icon = IMAGES_ASSETS_PATH + this.sectorSpdrService.getSectorIcon(this.symbol) + '.svg';

    this.quoteService.setConfiguration(FINANCIAL_API_SERVER, API_KEY);
    this.quoteService.getSnapQuotes("US:" + this.symbol, "SectorSpdr")
      .subscribe(resp => {
        if (resp.data.length > 0) {
          var quote = resp.data[0];

          if (quote.valid !== false) {

            this.changeGraphics = IMAGES_ASSETS_PATH + 'icon_indicator-none-gray.svg';
            if (quote.change > 0) {
              this.changeClass = "positive";
              this.changeGraphics = IMAGES_ASSETS_PATH + 'icon_indicator-up-green.svg';
            }
            else if (quote.change < 0) {
              this.changeClass = "negative";
              this.changeGraphics = IMAGES_ASSETS_PATH + 'icon_indicator-down-red.svg';
            }

            this.last = quote.last;
            this.changePercent = quote.changePercent;
          }
        }
      });

      var sector = this.sectorSpdrService.getSectorInfo(this.symbol);
      if(sector !== undefined){
        this.weight = sector.weight;
      } else {
        this.sectorSpdrService.getSectorEstimatedWeight(this.symbol)
        .subscribe(weight => this.weight = weight);
      }
  
  }

  trackerTapped() {
    console.log("Tracker tapped");
    this.trackerSelected.emit(this.symbol);
  }

}
