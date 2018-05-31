import { Component, Input } from '@angular/core';
import { QuoteService } from '../../providers/FinancialAPI'
import { SectorSpdrService } from '../../providers/SectorSpdrAPI';

import { FINANCIAL_API_SERVER, API_KEY } from '../../config/config';

const LOCAL_LANGUAGE: string = 'en-US';
const PRICE_TIMEZONE: string = 'US/Eastern';

@Component({
  selector: 'fund-banner',
  templateUrl: 'fund-banner.html'
})
export class FundBannerComponent {

  @Input() symbol: string;

  last: number = 103.96;
  change: number = 2.6;
  changePercent: number = 2.5;
  changeSign: string = "";
  volume: number = 18000000;
  lastTimeStamp: string;
  changeClass: string = "neutral";
  sectorName: string = "Consumer Discretionary";
  symbolColorClass: string = "xly";

  constructor(private quoteService: QuoteService,
    private sectorSpdrService: SectorSpdrService) {
  }

  ngOnInit() {
    const currentTime = new Date(Date.now());
    var convertedDateString = currentTime.toLocaleString(LOCAL_LANGUAGE, { timeZone: PRICE_TIMEZONE });
    this.lastTimeStamp = convertedDateString.replace('at ', '');
    if (this.change > 0) {
      this.changeSign = "+";
      this.changeClass = "positive";
    }
    else if (this.change < 0) {
      this.changeSign = "-";
      this.changeClass = "negative";
    }
    this.symbolColorClass = "fund-name " + this.symbol.toLowerCase();

    this.quoteService.setConfiguration(FINANCIAL_API_SERVER, API_KEY);
    this.quoteService.getSnapQuotes("US:" + this.symbol, "SectorSpdr")
      .subscribe(resp => {
        if (resp.data.length > 0) {
          var quote = resp.data[0];

          if (quote.valid !== false) {
            var convertedDateString = currentTime.toLocaleString(LOCAL_LANGUAGE, { timeZone: PRICE_TIMEZONE });
            this.lastTimeStamp = convertedDateString.replace('at ', '');

            if (quote.change > 0) {
              this.changeSign = "+";
              this.changeClass = "positive";
            }
            else if (quote.change < 0) {
              this.changeSign = "-";
              this.changeClass = "negative";
            }

            this.last = quote.last;
            this.change = quote.change;
            this.changePercent = quote.changePercent;
            this.volume = quote.volume;
          }
        }
      });

    var sector = this.sectorSpdrService.getSectorInfo(this.symbol);
    this.sectorName = sector.sectorName;
  }

}
