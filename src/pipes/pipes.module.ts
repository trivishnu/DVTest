import { NgModule } from '@angular/core';
import { PercentChangeFormatPipe } from './percent-change-format/percent-change-format';
import { PriceChangeFormatPipe } from './price-change-format/price-change-format';
import { BigNumberFormatPipe } from './big-number-format/big-number-format';
import { PercentStringFormatPipe } from './percent-string-format/percent-string-format';

@NgModule({
  declarations: [PercentChangeFormatPipe,
    PriceChangeFormatPipe,
    BigNumberFormatPipe,
    PercentStringFormatPipe],
  imports: [],
  exports: [PercentChangeFormatPipe,
    PriceChangeFormatPipe,
    BigNumberFormatPipe,
    PercentStringFormatPipe]
})

export class PipesModule { }
