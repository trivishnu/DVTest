import { Component, Input } from '@angular/core';
import { QuoteService } from '../../providers/FinancialAPI'
import { SectorSpdrService } from '../../providers/SectorSpdrAPI';

import { FINANCIAL_API_SERVER, API_KEY } from '../../config/config';

@Component({
  selector: 'fund-banner',
  templateUrl: 'fund-banner.html'
})
export class FundBannerComponent {

  @Input() symbol: string;

  last: string;
  change: string;
  changePercent: string;
  volume: string;
  asOfDate: string;
  lastTimeStamp: string;
  changeClass: string;
  sectorName: string;

  constructor(private quoteService: QuoteService,
    private sectorSpdrService: SectorSpdrService) {
  }

  ngOnInit() {
    const currentTime = new Date(Date.now());
    var convertedDateString = currentTime.toLocaleString('en-US', { timeZone: 'US/Eastern' });
    this.lastTimeStamp = convertedDateString.replace('at ', '');

    this.quoteService.setConfiguration(FINANCIAL_API_SERVER, API_KEY);
    this.quoteService.getSnapQuotes("US:" + this.symbol, "SectorSpdr")
      .subscribe(resp => {
        if (resp.data.length > 0) {
          var quote = resp.data[0];

          if (quote.valid !== false) {
            var convertedDateString = Date.now().toLocaleString();
            this.lastTimeStamp = convertedDateString.replace('at ', '');

            this.last = "$" + quote.last.toFixed(2);
            var changeSign = "";
            if (quote.change > 0) {
              changeSign = "+";
              this.changeClass = "positive";
            }
            else if (quote.change < 0) {
              changeSign = "-";
              this.changeClass = "negative";
            }
            else {
              this.changeClass = "neutral";
            }
            this.change = changeSign + "$" + Math.abs(quote.change).toFixed(2);
            this.changePercent = changeSign + Math.abs(quote.changePercent).toFixed(2) + "%";
            this.volume = this.formatLargeNumber(quote.volume);
          }
        }
      });

    var sector = this.sectorSpdrService.getSectorInfo(this.symbol);
    this.sectorName = sector.sectorName;
  }

  formatLargeNumber(value: number) {
    var suffix = "";
    if (value >= 1000000) {
      value = value / 1000000;
      suffix = " M";
    }
    else if (value >= 1000) {
      value = value / 1000;
      suffix = " K";
    }
    return value.toFixed(2) + suffix;
  }

}
