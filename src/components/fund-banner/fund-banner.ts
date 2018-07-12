import { Component, Input } from '@angular/core';
import { QuoteService } from '../../providers/FinancialAPI'
import { SectorSpdrService } from '../../providers/SectorSpdrAPI';

import { FINANCIAL_API_SERVER, API_KEY } from '../../config/config';

const LOCAL_LANGUAGE: string = 'en-US';
const PRICE_TIMEZONE: string = 'America/New_York';
const IMAGES_ASSETS_PATH = 'assets/imgs/';

@Component({
  selector: 'fund-banner',
  templateUrl: 'fund-banner.html'
})
export class FundBannerComponent {

  @Input() symbol: string;

  last: number = 0;
  change: number = 0;
  changePercent: number = 0;
  volume: number = 0;
  lastTimeStamp: string;
  lastDate: string;
  changeClass: string = "neutral";
  sectorName: string = "";
  symbolColorClass: string = "";
  icon: string = "";
  changeGraphics = '';

  constructor(private quoteService: QuoteService,
    private sectorSpdrService: SectorSpdrService) {
  }

  ngOnInit() {
    this.icon = IMAGES_ASSETS_PATH + this.sectorSpdrService.getSectorIcon(this.symbol) + '.svg';

    this.symbolColorClass = "fund-name " + this.symbol.toLowerCase();
    this.quoteService.setConfiguration(FINANCIAL_API_SERVER, API_KEY);
    this.quoteService.getSnapQuotes("US:" + this.symbol, "SectorSpdr")
      .subscribe(resp => {
        if (resp.data.length > 0) {
          var quote = resp.data[0];

          if (quote.valid !== false) {
            var convertedDateString = new Date(Date.parse(quote.lastTimestamp)).toLocaleString(LOCAL_LANGUAGE, { timeZone: PRICE_TIMEZONE });
            this.lastTimeStamp = convertedDateString.replace('at ', '');
            this.lastDate = this.lastTimeStamp;
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
            this.change = quote.change;
            this.changePercent = quote.changePercent;
            this.volume = quote.volume;
          }
        }
      });

    var sector = this.sectorSpdrService.getSectorInfo(this.symbol);
    if(sector !== undefined){
      this.sectorName = sector.sectorName;
    } else {
      this.sectorName = "Unknown Sector";
    }

  }

}
