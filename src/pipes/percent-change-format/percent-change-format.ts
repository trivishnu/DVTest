import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'percentChangeFormat',
})
export class PercentChangeFormatPipe implements PipeTransform {
  /**
   * formats price change percent
   */
  transform(value: number, ...args) {
    return Math.abs(value).toFixed(2) + "%";
  }
}
