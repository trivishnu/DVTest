import { Component, Input } from '@angular/core';
import { SectorSpdrService, FundSnapshot } from '../../providers/SectorSpdrAPI';
import { QuoteService } from '../../providers/FinancialAPI';

@Component({
  selector: 'fund-snapshot',
  templateUrl: 'fund-snapshot.html'
})
export class FundSnapshotComponent {

  @Input() symbol: string;

  marketCap: string;
  sharesOutstanding: string;
  exchange: string;
  averageVolume: string;
  index: string;
  indexValue: number;
  indexDividend: number;
  indexDividendYield: number;
  previousClose: number;
  fiftyTwoWeekHigh: number;
  fiftyTwoWeekLow: number;
  dayHigh: number;
  dayLow: number;
  last: number;
  sectorColor: string;
  retry: number = 0;
  generalDisclaimer: string;


  constructor(private sectorSpdrService: SectorSpdrService, private quoteService: QuoteService) {
  }

  ngOnInit() {
    this.sectorSpdrService.getDisclaimerContent('Home Page Disclosure (Mobile)')
      .subscribe(resp => {
        this.generalDisclaimer = resp;
      });
  }

  ngOnChanges() {
    this.requestData();
  }

  requestData() {
    this.sectorColor = this.sectorSpdrService.getSectorColor(this.symbol);

    this.quoteService.getSnapQuotes("US:" + this.symbol, "SectorSpdr")
      .subscribe(resp => {
        if (resp.data.length > 0) {
          var quote = resp.data[0];
          this.last = quote.last;
        }
      });

    this.sectorSpdrService.getSnapshot(this.symbol)
      .subscribe(
        resp => {
          this.updateFields(resp);
          this.retry = 0;
        },
        error => {
          if (this.retry <= 3) {
            this.retry++;
            this.requestData();
          }
        });
  }

  updateFields(snapshot: FundSnapshot) {
    this.marketCap = snapshot.marketCap;
    this.sharesOutstanding = snapshot.sharesOutstanding;
    this.exchange = snapshot.exchange;
    this.averageVolume = snapshot.averageVolume;
    this.index = snapshot.index;
    this.indexValue = snapshot.indexValue;
    this.indexDividend = snapshot.indexDividend;
    this.indexDividendYield = snapshot.indexDividendYield;
    this.previousClose = snapshot.previousClose;
    // since the daily values may get updated before the yearly high/low
    // we do a check and substitute the larger/lower intraday values as needed
    if (snapshot.dayHigh > snapshot.fiftyTwoWeekHigh) {
      this.fiftyTwoWeekHigh = snapshot.dayHigh;
    } else {
      this.fiftyTwoWeekHigh = snapshot.fiftyTwoWeekHigh;
    }
    if (snapshot.dayLow < snapshot.fiftyTwoWeekLow) {
      this.fiftyTwoWeekLow = snapshot.dayLow;
    } else {
      this.fiftyTwoWeekLow = snapshot.fiftyTwoWeekLow;
    }
    this.dayHigh = snapshot.dayHigh;
    this.dayLow = snapshot.dayLow;
  }

}
