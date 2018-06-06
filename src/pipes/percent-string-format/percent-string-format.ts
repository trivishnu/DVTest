import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'percentStringFormat',
})
export class PercentStringFormatPipe implements PipeTransform {

  transform(value: number, ...args) {
    return Number(value).toFixed(2) + '%';
  }
}
