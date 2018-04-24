import {Injectable} from '@angular/core';
import {HTTP} from '@ionic-native/http';

import {Observable} from 'rxjs/Observable';
import 'rxjs/add/observable/fromPromise';

@Injectable()
export class HttpNativeProvider {
    constructor(public http: HTTP) {}

    public get(url: string, params?: any, options: any = {}): Observable<Object> {
        let responseData = this.http.get(url, params, {})
            .then(resp => options.responseType == 'text' ? resp.data : JSON.parse(resp.data));

        return Observable.fromPromise(responseData) as Observable<Object>;
    }

    public post(url, params?: any, options: any = {}) {
        let responseData = this.http.post(url, params, {})
            .then(resp => options.responseType == 'text' ? resp.data : JSON.parse(resp.data));

        return Observable.fromPromise(responseData);
    }
}
