import { AutoCompleteSearchResult } from "./autoComplete-searchResult";
import { PagingMeta } from "./paging-meta";

export interface AutoCompleteSearchResults {
    meta: PagingMeta;
    data: [AutoCompleteSearchResult];
}
