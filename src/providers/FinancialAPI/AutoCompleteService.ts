import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import {Observable} from 'rxjs/Rx';

import { AutoCompleteSearchResults } from '.';

const SUGGEST_URL: string = '/autocomplete/v1/suggest';

@Injectable()
export class AutoCompleteService {

  server : string;
  authorizationKey : string;

  constructor(public httpClient: HttpClient) {

  }

  setConfiguration(server: string, authorizationKey:string) {
    this.server = server;
    this.authorizationKey = authorizationKey;
  }

  autoComplete(searchInput: string, exchanges: string, securityTypes: string) : Observable<AutoCompleteSearchResults> {

    return this.httpClient.get(this.server + SUGGEST_URL,
       {
          params: {
            search: searchInput,
            exchanges: exchanges,
            securityTypes: securityTypes
          },
          headers: new HttpHeaders().set('Authorization', this.authorizationKey)
      }
    ) as Observable<AutoCompleteSearchResults>;

  }

}
