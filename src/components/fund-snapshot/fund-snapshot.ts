import { Component, Input } from '@angular/core';
import { SectorSpdrService, FundSnapshot } from '../../providers/SectorSpdrAPI';
import { QuoteService } from '../../providers/FinancialAPI';
import { SECTOR_SPDR_SERVER } from '../../config/config';

/**
 * Generated class for the FundSnapshotComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
@Component({
  selector: 'fund-snapshot',
  templateUrl: 'fund-snapshot.html'
})
export class FundSnapshotComponent {

  @Input() symbol : string;

  marketCap: string;
  sharesOutstanding: string;
  exchange: string;
  averageVolume: string;
  index: string;
  indexValue: number;
  indexDividend: number;
  indexDividendYield: number;
  previousClose : number;
  fiftyTwoWeekHigh : number;
  fiftyTwoWeekLow : number;
  dayHigh : number;
  dayLow : number;
  last : number;
  sectorColor: number;

  sectors = [
    { symbol: 'XLE', color: 0xFFCA05 },
    { symbol: 'XLU', color: 0xFF9A00 },
    { symbol: 'XLK', color: 0x92278F },
    { symbol: 'XLB', color: 0x8E97C7 },
    { symbol: 'XLP', color: 0x00ABBC },
    { symbol: 'XLY', color: 0xC4CA40 },
    { symbol: 'XLI', color: 0x92C5EB },
    { symbol: 'XLV', color: 0x00ADEE },
    { symbol: 'XLF', color: 0xA6CE39 },
    { symbol: 'XLRE', color: 0xA40C1E }
  ];

  constructor(private sectorSpdrService: SectorSpdrService, private quoteService: QuoteService) {
    sectorSpdrService.setConfiguration(SECTOR_SPDR_SERVER);
  }

  ngOnInit() {
    
    this.sectorColor = this.getSectorColor(this.symbol);

    this.sectorSpdrService.getSnapshot(this.symbol)
    .subscribe(resp => {
      this.updateFields(resp);
    });

    this.quoteService.getSnapQuotes("US:" + this.symbol, "SectorSpdr")
    .subscribe(resp => {
      if( resp.data.length > 0 ) {
        var quote = resp.data[0];
        this.last = quote.last;
      }
    });

  }

  updateFields(snapshot : FundSnapshot) {

    this.marketCap = snapshot.marketCap;
    this.sharesOutstanding = snapshot.sharesOutstanding;
    this.exchange = snapshot.exchange;
    this.averageVolume = snapshot.averageVolume;
    this.index = snapshot.index;
    this.indexValue = snapshot.indexValue;
    this.indexDividend = snapshot.indexDividend;
    this.indexDividendYield = snapshot.indexDividendYield;
    this.previousClose = snapshot.previousClose;
    this.fiftyTwoWeekHigh = snapshot.fiftyTwoWeekHigh;
    this.fiftyTwoWeekLow = snapshot.fiftyTwoWeekLow;
    this.dayHigh = snapshot.dayHigh;
    this.dayLow = snapshot.dayLow;

  }

  getSectorColor(symbol: string) {

    for (let sector of this.sectors) {
      if (sector.symbol === symbol) {
        return sector.color;
      }
    }
    return 0x0000;

  }

}
