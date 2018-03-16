import { AutoCompleteSearchResult } from "./AutoCompleteSearchResult";
import { PagingMeta } from "./PagingMeta";

export interface AutoCompleteSearchResults {
    meta: PagingMeta;
    data: [AutoCompleteSearchResult];
}
