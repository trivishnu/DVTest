import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'priceChangeFormat',
})
export class PriceChangeFormatPipe implements PipeTransform {
  /**
   * send back formatted price change
   */
  transform(value: number, ...args) {
    let changeSign: string = "";
    if (value > 0) {
      changeSign = "+";
    }
    else if (value< 0) {
      changeSign = "-";
    }

    return changeSign + "$" + Math.abs(value).toFixed(2);
  }
}
