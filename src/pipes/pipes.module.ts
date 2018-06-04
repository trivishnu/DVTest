import { NgModule } from '@angular/core';
import { IndexValueFormatPipe } from './index-value-format/index-value-format';
import { PercentChangeFormatPipe } from './percent-change-format/percent-change-format';
import { PriceChangeFormatPipe } from './price-change-format/price-change-format';
import { BigNumberFormatPipe } from './big-number-format/big-number-format';

@NgModule({
  declarations: [IndexValueFormatPipe,
    PercentChangeFormatPipe,
    PriceChangeFormatPipe,
    BigNumberFormatPipe],
  imports: [],
  exports: [IndexValueFormatPipe,
    PercentChangeFormatPipe,
    PriceChangeFormatPipe,
    BigNumberFormatPipe]
})

export class PipesModule { }
