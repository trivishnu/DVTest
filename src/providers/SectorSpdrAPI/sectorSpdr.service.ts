import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {Observable} from 'rxjs/Rx';
import { map } from 'rxjs/operators';

import { FundDetails, SectorHoldings, FundSnapshot } from './index';
import { Sector } from './models/sector';
import { Holding } from './models/holding';

const SECTORS_LIST_URL: string = '/sectorspdr/api/IDCO.Client.Spdrs.SectorPie/SectorPieApi';
const FUND_DETAILS_URL: string = '/sectorspdr/api/fund-details/';
const FUND_SNAPSHOT_URL: string = '/sectorspdr/IDCO.Products.Etf.Profile/Profile/apiGetSnapshot?etfSymbol=';
const FUND_HOLDINGS_URL: string = '/sectorspdr/api/holdings/';

@Injectable()
export class SectorSpdrService {

  server : string;
  authorizationKey : string;

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

  //  return this.httpClient.get(this.server + FUND_HOLDINGS_URL + symbol) as Observable<SectorHoldings>;

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
          console.log("Index Name", endIndex);
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
          snapshot.fiftyTwoWeekHigh = dataSection.Value;
        }
        else if ( dataSection.Name ===  "52 Week Low" ) {
          snapshot.fiftyTwoWeekLow = dataSection.Value;
        }
        else if ( dataSection.Name ===  "Day's High" ) {
          snapshot.dayHigh = dataSection.Value;
        }
        else if ( dataSection.Name ===  "Day's Low" ) {
          snapshot.dayLow = dataSection.Value;
        }
      }

      return snapshot;
    }));

  }
  
  getSectorInfo(symbol: string) : Sector{

    for (let sector of this.sectors) {
      if ( sector.symbol == symbol )
        return sector;
    }
    return undefined;

  }


}
