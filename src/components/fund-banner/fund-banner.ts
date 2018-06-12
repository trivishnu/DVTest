import { Component, Input } from '@angular/core';
import { QuoteService } from '../../providers/FinancialAPI'
import { SectorSpdrService } from '../../providers/SectorSpdrAPI';

import { FINANCIAL_API_SERVER, API_KEY } from '../../config/config';

const LOCAL_LANGUAGE: string = 'en-US';
const PRICE_TIMEZONE: string = 'America/New_York';

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
  changeClass: string = "neutral";
  sectorName: string = "";
  symbolColorClass: string = "";

  constructor(private quoteService: QuoteService,
    private sectorSpdrService: SectorSpdrService) {
  }

  ngOnInit() {
    this.symbolColorClass = "fund-name " + this.symbol.toLowerCase();
    this.quoteService.setConfiguration(FINANCIAL_API_SERVER, API_KEY);
    this.quoteService.getSnapQuotes("US:" + this.symbol, "SectorSpdr")
      .subscribe(resp => {
        if (resp.data.length > 0) {
          var quote = resp.data[0];

          if (quote.valid !== false) {
            var convertedDateString = new Date(Date.parse(quote.lastTimestamp)).toLocaleString(LOCAL_LANGUAGE, { timeZone: PRICE_TIMEZONE });
            this.lastTimeStamp = convertedDateString.replace('at ', '');

            if (quote.change > 0) {
              this.changeClass = "positive";
            }
            else if (quote.change < 0) {
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
    if(sector !== undefined){
      this.sectorName = sector.sectorName;
    } else {
      this.sectorName = "Unknown Sector";
    }

  }

}
