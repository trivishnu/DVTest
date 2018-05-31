import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'priceChangeFormat',
})
export class PriceChangeFormatPipe implements PipeTransform {
  /**
   * send back formatted price
   */
  transform(value: number, ...args) {
    return "$" + Math.abs(value).toFixed(2);
  }
}
