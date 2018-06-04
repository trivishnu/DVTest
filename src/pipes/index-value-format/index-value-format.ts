import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'indexValueFormat',
})
export class IndexValueFormatPipe implements PipeTransform {
  /**
   * Take input index value and convert to string with two digits after the decimal
   */
  transform(value: number, ...args) {
    if (value) {
      return "" + value.toFixed(2);
    }
  }
}
