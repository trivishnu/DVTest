import { NgModule } from '@angular/core';
import { PercentChangeFormatPipe } from './percent-change-format/percent-change-format';
import { PriceChangeFormatPipe } from './price-change-format/price-change-format';
import { BigNumberFormatPipe } from './big-number-format/big-number-format';

@NgModule({
  declarations: [PercentChangeFormatPipe,
    PriceChangeFormatPipe,
    BigNumberFormatPipe],
  imports: [],
  exports: [PercentChangeFormatPipe,
    PriceChangeFormatPipe,
    BigNumberFormatPipe]
})

export class PipesModule { }
