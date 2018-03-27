import { Component } from '@angular/core';
import { QuoteService } from '../../providers/FinancialAPI'

import { SERVER, API_KEY } from '../../config/config';

/**
 * Generated class for the FundProfileComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
@Component({
  selector: 'fund-profile',
  templateUrl: 'fund-profile.html'
})
export class FundProfileComponent {

  symbol : string;

  last: string;
  change: string;
  changePercent: string;
  volume: string;
  asOfDate : string;

  changeClass : string;

  constructor(private quoteService: QuoteService) {

    this.symbol = 'XLE';

  }

  ngOnInit() {

    this.quoteService.setConfiguration(SERVER, API_KEY);
    this.quoteService.getSnapQuotes("US:" + this.symbol, "SectorSpdr")
    .subscribe(resp => {
      console.log(resp);
      if( resp.data.length > 0 ) {
        var quote = resp.data[0];

        var lastTimeStamp = new Date(quote.lastTimestamp);
        console.log("asOfDate datetime", lastTimeStamp);
        this.asOfDate = "as of " + this.formatTime(lastTimeStamp) + " ET " +  this.formatDate(lastTimeStamp);

        this.last = "$" + quote.last.toFixed(2);
        var changeSign = "";
        if( quote.change > 0){
          changeSign = "+";
          this.changeClass = "positive";
        }
        else if ( quote.change < 0) {
          changeSign = "-";
          this.changeClass = "negative";
        }
        else {
          this.changeClass = "neural";
        }
        this.change = changeSign + "$" + quote.change.toFixed(2);
        this.changePercent = changeSign + quote.changePercent.toFixed(2) + "%";
        this.volume = this.formatLargeNumber(quote.volume);
      }
    });

      // this.sectorSpdrService.getSectorsList()
    // .subscribe(resp => {
    //   console.log("ngOnInit", resp);
    // });

  }



  formatDate(date: Date) {
      
    var mm = date.getMonth() + 1; // getMonth() is zero-based
    var dd = date.getDate();
  
    return [(mm>9 ? '' : '0') + mm,
            (dd>9 ? '' : '0') + dd,
            date.getFullYear(),
           ].join('/');
  };

  formatTime(date: Date) {

    var h = (date.getHours() % 12) || 12; // show midnight & noon as 12
    return (
      h + ':' + date.getMinutes() +
      ( date.getHours() < 12 ? ' AM' : ' PM' )
    );
    
  }

  formatLargeNumber(value: number) {

    var suffix = "";
    if( value >= 1000000) {
      value = value / 1000000;
      suffix = " M";
    }
    else if( value >= 1000) {
      value = value / 1000;
      suffix = " K";
    }
    return value.toFixed(2) + suffix;

  }


}

