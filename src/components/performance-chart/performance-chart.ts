import { Component, Input, ElementRef } from '@angular/core';
import { Platform } from 'ionic-angular';
import { FundPerformance } from '../../providers/SectorSpdrAPI';
import { ChartService } from '../../providers/fdsg/chartService';

declare var FDSChartJS: any;

@Component({
  selector: 'performance-chart',
  templateUrl: 'performance-chart.html'
})
export class PerformanceChartComponent {

  @Input() performances : FundPerformance[];
  @Input() index : number;
  
  selectedPerformance: FundPerformance;

  chart: any;
  plot: any;
  series: any;

  windowWidth: any;

  constructor(private chartService: ChartService,
    private elementRef: ElementRef,
    private platform: Platform) {
      this.windowWidth = this.platform.width() * 0.95;
  }

  ngAfterContentInit() {
    this.setupChart();
  }

  setupChart() {

    var chartDiv = this.elementRef.nativeElement.querySelector('.chart');

    this.chart = this.chartService.getChart(chartDiv, this.windowWidth, 200);
    this.chartService.setChartColor(this.chart, 0x231E19);

    this.plot = this.chartService.getChartPlot(this.chart);
    this.series = this.getChartSeries();

    this.plot.addSeries(this.series);
    this.series.setAttributes({
      'SeriesConditionalColorDimension' : 2,
      'SeriesConditionalColorProperty' : "[>0](3394713):(3618815)",
      SeriesValue: true,
      SeriesValueFontColor : 0xFFFFFF,
      SeriesValuePlacement: 2,
      SeriesValueFGStyle: 5,
      SeriesValueText: '<FDSProperty name="FDSDataY" type="FLOAT" format="#.2F%" >'
    });

    this.chartService.configureChartAxes(this.chart);

  }

  getChartSeries() {
    var xData = new FDSChartJS.models.data({
      dataType: 'string',
      data: ['1M', 'LastQ', '1 Yr', '3 Yr', '5 Yr', '10 Yr' ]
    });

    var yData = new FDSChartJS.models.data({
      dataType: "float",
      data: [],
    });

    return new FDSChartJS.models.series({
      id: "Series",
      drawStyle: FDSChartJS.constants.DrawStyle.COLUMNS,
      x: xData,
      y: yData
    });
  };

  ngOnChanges() {
    if( this.performances === undefined )
      return;
    this.updateChart();
  }

  updateChart() {

    if( this.series == undefined )
      return;

    var performance = this.performances[this.index];
    var values = [
      performance.oneMonth,
      performance.oneMonth,
      performance.annualizedOneYear,
      performance.annualizedThreeYear,
      performance.annualizedFiveYear,
      performance.annualizedTenYear];

      this.series.getData().y.replace(0, values);
      this.chart.invalidate();
  }

}
