import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'priceFormat',
})
export class PriceFormatPipe implements PipeTransform {
  /**
   * Take input price -> add currency and convert to string
   */
  transform(value: number, ...args) {
    return "$" + value.toFixed(2);
  }
}
