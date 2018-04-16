import { Component, ElementRef } from '@angular/core';
import { NavController, Platform } from 'ionic-angular';

import { QuoteService } from '../../providers/FinancialAPI'

import { SERVER, API_KEY } from '../../config/config';
import { ChartService } from '../../providers/fdsg/chartService';

// import { QuoteService } from ''

declare var FDSChartJS: any;
//import * as FDSChartJS from '@fds/fdschartjs'

@Component({
  selector: 'page-charts',
  templateUrl: 'charts.html'
})
export class ChartsPage {

  chartType: string;
  symbol: string;

  // Chart Objects
  chart: any;
  //  plot: any;
  series: any;
  windowHeight: any;
  windowWidth: any;

  sectors = [
    { symbol: 'XLE', color: 0xFFCA05 },
    { symbol: 'XLU', color: 0xFF9A00 },
    { symbol: 'XLK', color: 0x92278F },
    { symbol: 'XLB', color: 0x8E97C7 },
    { symbol: 'XLP', color: 0x00ABBC },
    { symbol: 'XLY', color: 0xC4CA40 },
    { symbol: 'XLI', color: 0x92C5EB },
    { symbol: 'XLV', color: 0x00ADEE },
    { symbol: 'XLF', color: 0xA6CE39 },
    { symbol: 'XLRE', color: 0xA40C1E }
  ];


  constructor(public navCtrl: NavController, private elementRef: ElementRef,
    private quoteService: QuoteService, private chartService: ChartService,
    private platform: Platform) {

    this.chartType = "1M";
    this.symbol = "XLE";
    this.windowWidth = platform.width();
    this.windowHeight = platform.height()-250;
  }

  ionViewDidLoad() {
    this.setupChart();
    this.chartType = "1D";
  }

  onSectorChange() {
    this.refreshChart();
  }

  onChartTypeChange() {
    this.refreshChart();
  }

  setupChart() {

    var chartDiv = this.elementRef.nativeElement.querySelector('#chart');

    this.chart = new FDSChartJS(chartDiv, { appName: 'fdsg-app', theme: 1, disableLogging: true, height: this.windowHeight });

    var plot = new FDSChartJS.models.plot({
      id: "plot"
    });

    // plot.AxisResetOnDataChange = true;

    this.chart.addPlot(plot);

    plot.setAttribute('AxisResetOnDataChange', 'app', true);


    // Plot attributes

    plot.setAttributes({
      'Heading1': false,
      'Heading2': false,
      'UseIntradayScale': true,
      //      'XIntradayLabeling': true,
      'XLabelsLevelsMask': 3,
      'XLabelMinorPadding': 10,
      'XRemoveGapsFromMinorIntervals': 0, //Want to remove gaps from minor labels
      //If auto detection is true, uses that. Otherwise, use XMinorUnitStart/XMinorUnitEnd
      'XAutomaticStartEndDayDetection': false,
      'XMinorUnitStart': '---3-30-0' // Second day starts at 3:30AM when auto detection is off
    });


    // Major Scale Label Format
    plot.setAttributes({
      'XIntradayScaleLabelFormatDAY': 'MMM dd, YYYY',   // 1D
      'XIntradayScaleLabelFormatWEEK': 'MMM'   // 1M, 3M, 6M
    });


    // Minor Scale Label Format
    plot.setAttributes({
      'XIntradayScaleMinorLabelFormatMINUTE': 'h:nn am',
      'XIntradayScaleMinorLabelFormatFIVEMINUTE': 'h:nn am',
      'XIntradayScaleMinorLabelFormatFIVESECOND': 'h:nn am',
      'XIntradayScaleMinorLabelFormatFIVEY': 'h:nn am',
      'XIntradayScaleMinorLabelFormatTENMINUTE': 'h:nn am',
      'XIntradayScaleMinorLabelFormatHALFHOUR': 'h:nn am',
      'XIntradayScaleMinorLabelFormatHALFMINUTE': 'h:nn am',
      'XIntradayScaleMinorLabelFormatHALFY': 'h:nn am',
      'XIntradayScaleMinorLabelFormatHOUR': 'h:nn am',
      'XIntradayScaleMinorLabelFormatDAY': 'd',   // 1M
      'XIntradayScaleMinorLabelFormatQUARTER': 'MMM',   // 5Y, 10Y
      'XIntradayScaleMinorLabelFormatMONTH': 'MMM',
      'XIntradayScaleMinorLabelFormatYEAR': 'MMM'
    });

    this.series = this.getChartSeries();
    plot.addSeries(this.series);

  }

  getChartSeries() {
    var xData = new FDSChartJS.models.data({
      dataType: 'DateTime',
      data: []
    });

    var yData = new FDSChartJS.models.data({
      dataType: "float",
      data: [],
    });

    return new FDSChartJS.models.series({
      id: "Series",
      x: xData,
      y: yData,
    });
  };

  refreshChart() {

    var params = this.getHistoricaDataParameters(this.chartType);
    //    console.log("params", params);

    this.quoteService.setConfiguration(SERVER, API_KEY);
    this.quoteService.getHistoricalQuotes("US:" + this.symbol, params.start, params.end, params.resolution)
      .subscribe(historicalQuotes => {

        var labels = historicalQuotes.data.map(p => this.chartService.getChartTime(p.lastTimestamp));
        var values = historicalQuotes.data.map(p => p.last);

        this.series.getData().x.replace(0, labels);
        this.series.getData().y.replace(0, values);
        this.series.setAttribute('Label', 'app', this.symbol);
        this.series.setAttribute('SeriesColor', 'app', this.getSectorColor(this.symbol));

        // Display chart. Per FactSet Charting group, use invalidate instead of draw
        this.chart.invalidate();
      }
      );

  }

  getHistoricaDataParameters(chartType: string) {

    switch (chartType) {

      case "1M":
        return this.getMonthsHistoricaDataParameters(1);

      case "3M":
        return this.getMonthsHistoricaDataParameters(3);

      case "6M":
        return this.getMonthsHistoricaDataParameters(6);

      case 'YTD':
        return this.getYTDHistoricaDataParameters();

      case "1Y":
        return this.getYearsHistoricaDataParameters(1);

      case "5Y":
        return this.getYearsHistoricaDataParameters(5);

      case "10Y":
        return this.getYearsHistoricaDataParameters(10);

      default:
        return this.getOneDayHistoricaDataParameters();
    }

  }

  getOneDayHistoricaDataParameters() {
    var startDate = new Date();
    startDate.setHours(0, 0, 0, 0);
    var endDate = new Date();
    endDate.setHours(23, 59, 59, 0);
    return { start: startDate.toISOString(), end: endDate.toISOString(), resolution: 'MINUTE' };
  }

  getMonthsHistoricaDataParameters(month: number) {
    var startDate = new Date();
    startDate.setMonth(startDate.getMonth() - month);
    var endDate = new Date();
    return { start: startDate.toISOString(), end: endDate.toISOString(), resolution: 'DAY' };
  }

  getYearsHistoricaDataParameters(year: number) {
    var startDate = new Date();
    startDate.setFullYear(startDate.getFullYear() - year);
    var endDate = new Date();
    return { start: startDate.toISOString(), end: endDate.toISOString(), resolution: 'MONTH' };
  }


  getYTDHistoricaDataParameters() {
    var startDate = new Date(new Date().getFullYear(), 0, 1)
    startDate.setHours(0, 0, 0, 0);
    var endDate = new Date();
    return { start: startDate.toISOString(), end: endDate.toISOString(), resolution: 'DAY' };
  }

  getSectorColor(symbol: string) {

    for (let sector of this.sectors) {
      if (sector.symbol === symbol) {
        return sector.color;
      }
    }
    return 0x0000;

  }

}
