import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import {Observable} from 'rxjs/Rx';

import { HistoricalQuotes, SnapQuotes } from '.';
import { HistoricalQuotesType } from '.';

const SNAP_QUOTE_URL: string = '/quotes/v1/snap-quotes';
const HISTORICAL_QUOTE_URL: string = '/quotes/v1/historical-quotes';



@Injectable()
export class QuoteService {

  server : string;
  authorizationKey : string;

  constructor(public httpClient: HttpClient) {

  }

  setConfiguration(server: string, authorizationKey:string) {
    this.server = server;
    this.authorizationKey = authorizationKey;
  }

  getHistoricalQuotes(identifier: string, startDateTime: string, endDateTime: string,
    resolution: string) : Observable<HistoricalQuotes> {

    return this.httpClient.get(this.server + HISTORICAL_QUOTE_URL,
       {
//        headers: new HttpHeaders().set('Authorization', API_KEY),
        headers: new HttpHeaders().set('Authorization', this.authorizationKey),
        params: {
            identifier: identifier,
            startTimestamp: startDateTime,
            endTimestamp: endDateTime,
            resolution: resolution,
        }
      }
    ) as Observable<HistoricalQuotes>;

  }

  getSnapQuotes(identifiers: string, userId: string, fields: string = "") : Observable<SnapQuotes> {

    return this.httpClient.get(this.server + SNAP_QUOTE_URL,
       {
        headers: new HttpHeaders().set('Authorization', this.authorizationKey),
        params: {
            identifiers: identifiers,
            userId: userId,
            fields: fields
        }
      }
    ) as Observable<SnapQuotes>;

  }

  
  getHistoricaDataParameters(historicalQuotesType: HistoricalQuotesType) {

    switch (historicalQuotesType) {

      case HistoricalQuotesType.OneWeek:
        return this.getDaysHistoricaDataParameters(7);

      case HistoricalQuotesType.OneMonth:
        return this.getMonthsHistoricaDataParameters(1);

      case HistoricalQuotesType.ThreeMonths:
        return this.getMonthsHistoricaDataParameters(3);

      case HistoricalQuotesType.SixMonths:
        return this.getMonthsHistoricaDataParameters(6);

      case HistoricalQuotesType.YearToDate:
        return this.getYTDHistoricaDataParameters();

      case HistoricalQuotesType.OneYear:
        return this.getYearsHistoricaDataParameters(1);

      case HistoricalQuotesType.ThreeYear:
        return this.getYearsHistoricaDataParameters(3);

      case HistoricalQuotesType.FiveYear:
        return this.getYearsHistoricaDataParameters(5);

      case HistoricalQuotesType.Maximum:
        return this.getYearsHistoricaDataParameters(25);

      default:
        return this.getOneDayHistoricaDataParameters();
    }

  }

  // getHistoricaDataParameters(timelineType: string) {

  //   switch (timelineType) {

  //     case "1M":
  //       return this.getMonthsHistoricaDataParameters(1);

  //     case "1W":
  //       return this.getDaysHistoricaDataParameters(7);

  //     case "3M":
  //       return this.getMonthsHistoricaDataParameters(3);

  //     case "6M":
  //       return this.getMonthsHistoricaDataParameters(6);

  //     case 'YTD':
  //       return this.getYTDHistoricaDataParameters();

  //     case "1Y":
  //       return this.getYearsHistoricaDataParameters(1);

  //     case "3Y":
  //       return this.getYearsHistoricaDataParameters(3);

  //     case "5Y":
  //       return this.getYearsHistoricaDataParameters(5);

  //     case "MAX":
  //       return this.getYearsHistoricaDataParameters(25);

  //     default:
  //       return this.getOneDayHistoricaDataParameters();
  //   }

  // }

  getOneDayHistoricaDataParameters() {
    var startDate = new Date();
    startDate.setHours(0, 0, 0, 0);
    var endDate = new Date();
    endDate.setHours(23, 59, 59, 0);
    return { start: startDate.toISOString(), end: endDate.toISOString(), resolution: 'MINUTE' };
  }

  getDaysHistoricaDataParameters(day: number) {
    var startDate = new Date();
    startDate.setDate(startDate.getDate() - day);
    console.log("Day: Start Date", startDate);
    var endDate = new Date();
    return { start: startDate.toISOString(), end: endDate.toISOString(), resolution: 'DAY' };
  }

  getMonthsHistoricaDataParameters(month: number) {
    var startDate = new Date();
    startDate.setMonth(startDate.getMonth() - month);
    var endDate = new Date();
    return { start: startDate.toISOString(), end: endDate.toISOString(), resolution: 'DAY' };
  }

  getYearsHistoricaDataParameters(year: number) {
    var startDate = new Date();
    startDate.setFullYear(startDate.getFullYear() - year);
    var endDate = new Date();
    return { start: startDate.toISOString(), end: endDate.toISOString(), resolution: 'MONTH' };
  }


  getYTDHistoricaDataParameters() {
    var startDate = new Date(new Date().getFullYear(), 0, 1)
    startDate.setHours(0, 0, 0, 0);
    var endDate = new Date();
    return { start: startDate.toISOString(), end: endDate.toISOString(), resolution: 'DAY' };
  }

}
