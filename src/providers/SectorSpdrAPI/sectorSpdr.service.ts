import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {Observable} from 'rxjs/Rx';
import { map } from 'rxjs/operators';

import { FundDetails, SectorHoldings, FundSnapshot, SectorTracker, DividendDistribution, FundDocument } from './index';
import { Sector } from './models/sector';
import { Holding } from './models/holding';
import { Dividend } from './models/dividend';

const SECTORS_LIST_URL: string = '/sectorspdr/api/IDCO.Client.Spdrs.SectorPie/SectorPieApi';
const FUND_DETAILS_URL: string = '/sectorspdr/api/fund-details/';
const FUND_SNAPSHOT_URL: string = '/sectorspdr/IDCO.Products.Etf.Profile/Profile/apiGetSnapshot?etfSymbol=';
const FUND_HOLDINGS_URL: string = '/sectorspdr/api/holdings/';
const SECTOR_TRACKER_URL: string = '/sectorspdr/api/IDCO.Client.Spdrs.SectorTracker/SectorTrackerApi';
const DIVIDEND_DISTRIBUTIONS_URL: string = '/sectorspdr/IDCO.Client.Spdrs.Distributions/Distributions/Distributions';
const FUND_DOCUMENTS_URL: string = '/sectorspdr/IDCO.Client.Spdrs.DocumentLibrary/Document/GetFundDocuments?symbol=XLE';
// const SECTOR_OVERVIEW_URL: string = '/sectorspdr/api/IDCO.Client.Spdrs.SectorTracker/SectorOverviewApi?period=';

@Injectable()
export class SectorSpdrService {

  server : string;

  sectors: Sector[];

  constructor(public httpClient: HttpClient) {

//    this.server = 'http://www.sectorspdr.com';
    this.server = '';
  }

  setConfiguration(server: string) {
    this.server = server;
  }

  initialize() {

    this.getSectorsList()
    .subscribe( sectors => this.sectors = sectors );

  }

  getSectorsList() : Observable<Sector[]> {

    return this.httpClient.get<Object[]>(this.server + SECTORS_LIST_URL)
    .pipe(map(data => data.map(res => {
      var s = res as any;
      var sector = new Sector();
      sector.symbol = s.Symbol;
      sector.sectorName = s.SectorName;
      sector.dateOfLoad = s.DateOfLoad;
      sector.weight = s.Weight;
      sector.description = s.SectorDescription;
      return sector;
    })));

  }

  getFundDetails(symbol: string) : Observable<FundDetails> {

    return this.httpClient.get(this.server + FUND_DETAILS_URL + symbol) as Observable<FundDetails>;

  }
  
  getFundHoldings(symbol: string) : Observable<SectorHoldings>{

    return this.httpClient.get(this.server + FUND_HOLDINGS_URL + symbol)
    .pipe(map(data => {
      var holdings = new SectorHoldings();
      var sectorData = data as any;
      holdings.asOfDate = sectorData.asOfDate;
      holdings.asOfTime = sectorData.asOfTime;
      holdings.items = sectorData.items.map(
        holdingData => {

          var holding = new Holding();
          holding.symbol = holdingData.Symbol
          holding.companyName = holdingData.CompanyName
          holding.indexWeight = holdingData.IndexWeight
          holding.last = holdingData.Last
          holding.change = holdingData.Change
          holding.percentChange = holdingData.PercentChange
          holding.volume = holdingData.Volume
          holding.price52WeeksRange = holdingData.Price52WeeksRange

          return holding
        }
      );
      return holdings;
    }))

  }
  
  getSnapshot(symbol: string) : Observable<FundSnapshot>{

    return this.httpClient.get(this.server + FUND_SNAPSHOT_URL + symbol)
    .pipe(map(results => {

      var snapshotData = results as any[];
      var snapshot = new FundSnapshot();

      for (var i = 0; i < snapshotData.length; i++) {
        var dataSection = snapshotData[i];
        var value = dataSection.Value as string;

        if ( dataSection.Name ===  "Market Cap" ) {
          snapshot.marketCap = dataSection.Value + " " + dataSection.Unit;
        }
        else if ( dataSection.Name ===  "Shares Outstanding" ) {
          snapshot.sharesOutstanding = dataSection.Value;
        }
        else if ( dataSection.Name ===  "Exchange Name" ) {
          snapshot.exchange = dataSection.Value;
        }
        else if ( dataSection.Name ===  "Average Volume" ) {
          snapshot.averageVolume = dataSection.Value + " " + dataSection.Unit;
        }
        else if ( dataSection.Name ===  "Index Value" ) {
          snapshot.indexValue = dataSection.Value;
          var startIndex = dataSection.DisplayName.indexOf("(");
          var endIndex = dataSection.DisplayName.indexOf(")");
          snapshot.index = dataSection.DisplayName.substring(startIndex + 1, endIndex);
        }
        else if ( dataSection.Name ===  "Index Dividend" ) {
          snapshot.indexDividend = dataSection.Value;
        }
        else if ( dataSection.Name ===  "Index Dividend Yield" ) {
          snapshot.indexDividendYield = dataSection.Value;
        }
        else if ( dataSection.Name ===  "Previous Close" ) {
          snapshot.previousClose = dataSection.Value;
        }
        else if ( dataSection.Name ===  "52 Week High" ) {
          snapshot.fiftyTwoWeekHigh = this.numberFromCurrency(value);
        }
        else if ( dataSection.Name ===  "52 Week Low" ) {
          snapshot.fiftyTwoWeekLow = this.numberFromCurrency(value);
        }
        else if ( dataSection.Name ===  "Day's High" ) {
          snapshot.dayHigh =this.numberFromCurrency(value);
        }
        else if ( dataSection.Name ===  "Day's Low" ) {
          snapshot.dayLow = this.numberFromCurrency(value);
        }
      }

      return snapshot;
    }));

  }


  getSectorTracker(perid: string = "1D") : Observable<SectorTracker[]> {

    var parameters = {
      period: perid
    };

    var url = this.buildUrl(this.server + SECTOR_TRACKER_URL, parameters);
    
    return this.httpClient.get<Object[]>(url)
    .pipe(map(data => data.map(res => {
      var s = res as any;
      var sectorTracker = new SectorTracker();
      sectorTracker.symbol = s.Symbol;
      sectorTracker.displayName = s.DisplayName;
      sectorTracker.changeString = s.ChangeString;
      sectorTracker.change = s.Change;
      return sectorTracker;
    })));

  }



















  

  
  getDividendDistributions(symbol: string, yearsCount: number = 10) : Observable<DividendDistribution[]>  {

    var parameters = {
      sector : symbol,
      yearsCount: yearsCount
    };

    var url = this.buildUrl(this.server + DIVIDEND_DISTRIBUTIONS_URL, parameters);

console.log("url", url);
    
    return this.httpClient.get(url)
    .pipe(map(resp => {

      var data = resp as any;
console.log("Pre map", resp);
      return data.Distributions.map(res => {
        var d = res as any;
        var dividendDistribution = new DividendDistribution();
        dividendDistribution.year = d.Year;
        dividendDistribution.rate = d.Rate;
        dividendDistribution.ordinaryIncome = d.OrdinaryIncome;
        dividendDistribution.shortTermCapitalGains = d.ShortTermCapitalGains;
        dividendDistribution.longTermCapitalGains = d.LongTermCapitalGains;
        dividendDistribution.returnOfCapital = d.ReturnOfCapital;
        dividendDistribution.dividends = d.Dividends.map(d => {
          var dividend = new Dividend();
          dividend.exDividendDate = d.ExDividendDate;
          dividend.recordDate = d.RecordDate;
          dividend.paymentDate = d.PaymentDate;
          dividend.ratePerShare = d.RatePerShare;
          dividend.ordinaryIncome = d.OrdinaryIncome;
          dividend.shortTermCapitalGains = d.ShortTermCapitalGains;
          dividend.longTermCapitalGains = d.LongTermCapitalGains;
          dividend.returnOfCapital = d.ReturnOfCapital;
          return dividend;
        })
        return dividendDistribution;
      });

    }));

      // return this.httpClient.get(url).subscribe(
      //   (resp) => {
      //     console.log(resp.Distributions);
      //   });
  
    //   return this.httpClient.get<Object[]>(url)
    // .pipe(map(data => data.map(res => {
    //   var d = res as any;
    //   var dividendDistribution = new DividendDistribution();
    //   dividendDistribution.year = d.Year;
    //   dividendDistribution.rate = d.Rate;
    //   dividendDistribution.ordinaryIncome = d.OrdinaryIncome;
    //   dividendDistribution.shortTermCapitalGains = d.shortTermCapitalGains;
    //   dividendDistribution.longTermCapitalGains = d.LongTermCapitalGains;
    //   dividendDistribution.returnOfCapital = d.ReturnOfCapital;
    //   return dividendDistribution;
    // })));

  }



  getFundDocuments(symbol: string) : Observable<FundDocument[]> {

    var parameters = {
      symbol: symbol
    };

    var url = this.buildUrl(this.server + FUND_DOCUMENTS_URL, parameters);
    
    return this.httpClient.get<FundDocument[]>(url)
    .pipe(map(data => data.map(res => {
      var d = res as any;
      var document = new FundDocument();
      document.title = d.Title;
      document.url = d.Url;
      document.asOfDate = d.AsOfDate;
      return document;
    })));

  }

  buildUrl(url, parameters){
    var qs = "";
    for(var key in parameters) {
      var value = parameters[key];
      qs += encodeURIComponent(key) + "=" + encodeURIComponent(value) + "&";
    }
    if (qs.length > 0){
      qs = qs.substring(0, qs.length-1); //chop off last "&"
      url = url + "?" + qs;
    }
    return url;
  }

  formatCurrency(value: number) {

    var formatter = new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 2,
      // the default value for minimumFractionDigits depends on the currency
      // and is usually already 2
    });

    return formatter.format(value);
  }

  numberFromCurrency(text: string){
    return Number(text.replace(/[^0-9\.-]+/g,""));
  }

  getSectorInfo(symbol: string) : Sector{

    for (let sector of this.sectors) {
      if ( sector.symbol == symbol )
        return sector;
    }
    return undefined;

  }


}
