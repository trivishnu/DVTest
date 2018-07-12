import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Observable } from 'rxjs/Observable';

@Injectable()
export class HttpAngularProvider {
  constructor(public http: HttpClient) { }

  public get(url: string, params?: any, options: any = {}): Observable<Object> {
    options.params = params;
    options.withCredentials = true;

    return this.http.get(url, options) as Observable<Object>;
  }

  public post(url: string, params?: any, options?: HttpHeaders): Observable<Object> {
  //  options.withCredentials = true;
    // If you are having issues with the angular post body getting encoded incorrectly
    // you may be having an issue with the bodyparams that are encoded below.
    let bodyparams = new URLSearchParams();
    bodyparams.set("", params);

    return this.http.post(url, bodyparams.toString(), {'headers': options}) as Observable<Object>;
  }

  private createSearchParams(params: any) {
    let searchParams = new URLSearchParams();
    for (let k in params) {
      if (params.hasOwnProperty(k)) {
        searchParams.set(k, params[k]);
      }
    }

    return searchParams;
  }
}
