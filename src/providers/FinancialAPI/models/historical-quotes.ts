import { PagingMeta } from "./paging-meta";
import {HistoricalQuote} from "./historical-quote"

export interface HistoricalQuotes {
    meta: PagingMeta;
    data: [HistoricalQuote];
}
