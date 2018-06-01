import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'percentChangeFormat',
})
export class PercentChangeFormatPipe implements PipeTransform {
  /**
   * formats price change percent
   */
  transform(value: number, ...args) {
    let changeSign: string = "";
    if (value > 0) {
      changeSign = "+";
    }
    else if (value< 0) {
      changeSign = "-";
    }

    return changeSign + Math.abs(value).toFixed(2) + "%";
  }
}
