import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'volumeFormat',
})

/*
Converts big numbers to a nice string for display
*/
export class VolumeFormatPipe implements PipeTransform {

  transform(value: number, ...args) {
    var suffix = "";
    if (value >= 1000000) {
      value = value / 1000000;
      suffix = "M";
    }
    else if (value >= 1000) {
      value = value / 1000;
      suffix = "K";
    }
    return value.toFixed(2) + suffix;
  }

}
