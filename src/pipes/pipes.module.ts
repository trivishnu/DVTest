import { NgModule } from '@angular/core';
import { PriceFormatPipe } from './price-format/price-format';
import { PercentChangeFormatPipe } from './percent-change-format/percent-change-format';
import { PriceChangeFormatPipe } from './price-change-format/price-change-format';
import { VolumeFormatPipe } from './volume-format/volume-format';

@NgModule({
  declarations: [PriceFormatPipe,
    PercentChangeFormatPipe,
    PriceChangeFormatPipe,
    VolumeFormatPipe],
  imports: [],
  exports: [PriceFormatPipe,
    PercentChangeFormatPipe,
    PriceChangeFormatPipe,
    VolumeFormatPipe]
})

export class PipesModule { }
