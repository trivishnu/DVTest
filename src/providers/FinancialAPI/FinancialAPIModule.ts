import { NgModule } from '@angular/core';

import { QuoteService } from '.';
import { AutoCompleteService } from '.';

@NgModule({
  declarations: [],
  providers: [QuoteService, AutoCompleteService]
})
export class FinancialAPIModule {}
