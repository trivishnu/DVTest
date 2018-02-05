import { Injectable } from '@angular/core';
import { HTTP } from '@ionic-native/http';

const SUGGEST_URL: string = 'https://api.test.idmanagedsolutions.com/autocomplete/v1/suggest';
const SUGGEST_EXCHANGES: string = 'NYS,NAS,AMEX';
const SUGGEST_SECURITY_TYPES: string = 'STO,X-STO.COMMON,X-STO.PREF,ETF,IND,X-FUN.LIPPER,X-DEPOSITORY.RECEIPT,X-STO.RIGHT';
const API_KEY: string = 'IDMS-CLIENTKEY Dk0vjumHmzzZF89noZ04B60xnQzUdNisncWxN7UV1RIckxRsxocl';

@Injectable()
export class FdsgProvider {
  public searchResults: '{"meta": {}, "data": {}}';

  constructor(public http: HTTP) {
    // using a plugin for HTTP Client requests
    // https://github.com/silkimen/cordova-plugin-advanced-http

    console.log('Hello FdsgProvider Provider');

    // TODO: initialization of this provider should call the authentication
    // plugin which will return a valid access token for the current session
  }

  autoComplete(searchInput: string): Promise<any> {
    return this.http.get(SUGGEST_URL, {
      search: searchInput,
      exchanges: SUGGEST_EXCHANGES,
      securityTypes: SUGGEST_SECURITY_TYPES
    }, { Authorization:  API_KEY })
      .then(resp => {
        return JSON.parse(resp.data);
      })
      .catch(error => {
        return {};
      });
  }

}
