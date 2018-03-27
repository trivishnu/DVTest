import { Quote } from "./quote";

export interface SnapQuotes {
    meta: { identifiersNotFound : String[] };
    data: Quote[];
  }
  