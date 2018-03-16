import { PagingMeta } from "./PagingMeta";
import {HistoricalQuote} from "./HistoricalQuote"

export interface HistoricalQuotes {
    meta: PagingMeta;
    data: [HistoricalQuote];
}
