import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import {Observable} from 'rxjs/Rx';

import { HistoricalQuotes, SnapQuotes } from '.';

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

}
