import { Component, Input, SimpleChanges } from '@angular/core';

@Component({
  selector: 'fifty-two-weeks-chart',
  templateUrl: 'fifty-two-weeks-chart.html'
})
export class FiftyTwoWeeksChartComponent {

  @Input() fiftyTwoWeekHigh: number;
  @Input() fiftyTwoWeekLow: number;
  @Input() dayHigh: number;
  @Input() dayLow: number;
  @Input() last: number;
  @Input() color: string;

  todayLowStart: number = 0;
  todayRangeWidth: number = 0;
  todayLowLabelEnd: number = 0;
  todayHighLabelStart: number = 0;
  todayLastStart: number = 0;
  sColor = "";

  ngOnChanges(changes: SimpleChanges) {
    this.sColor = this.color;
    this.setChartFields();
  }

  setChartFields() {
    if (this.fiftyTwoWeekLow !== undefined && this.last !== undefined) {
      this.todayLowStart = ((this.dayLow - this.fiftyTwoWeekLow) / (this.fiftyTwoWeekHigh - this.fiftyTwoWeekLow) * 200) + 60;
      var todayHighEnd = ((this.dayHigh - this.fiftyTwoWeekLow) / (this.fiftyTwoWeekHigh - this.fiftyTwoWeekLow) * 200) + 60;
      this.todayRangeWidth = todayHighEnd - this.todayLowStart;
      this.todayLowLabelEnd = this.todayLowStart - 10;
      this.todayHighLabelStart = todayHighEnd + 10;
      this.todayLastStart = ((this.last - this.fiftyTwoWeekLow) / (this.fiftyTwoWeekHigh - this.fiftyTwoWeekLow) * 200) + 60;
    }
  }

}
