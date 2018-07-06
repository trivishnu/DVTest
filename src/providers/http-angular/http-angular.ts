import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class HttpAngularProvider {
    constructor(public http: HttpClient) {}

    public get(url: string, params?: any, options: any = {}): Observable<Object> {
        options.params = params;
        options.withCredentials = true;

        return this.http.get(url, options) as Observable<Object>;
    }

    public post(url: string, params: any, options: any = {}): Observable<Object> {
        options.withCredentials = true;
        return this.http.post(url, params, options) as Observable<Object>;
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
