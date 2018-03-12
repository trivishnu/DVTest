import { Component, ElementRef } from '@angular/core';
import { NavController } from 'ionic-angular';

import { FdsgProvider } from '../../providers/fdsg/fdsg';

 declare var FDSChartJS: any;
//import * as FDSChartJS from '@fds/fdschartjs'

@Component({
  selector: 'page-funds',
  templateUrl: 'funds.html'
})
export class FundsPage {

  chartType : string;
  symbol: string;

  // Chart Objects
  chart: any;
//  plot: any;
  series: any;

  sectors = [
    { symbol: 'XLE', color : 0xFFCA05},
    { symbol: 'XLU', color : 0xFF9A00},
    { symbol: 'XLK', color : 0x92278F},
    { symbol: 'XLB', color : 0x8E97C7},
    { symbol: 'XLP', color : 0x00ABBC},
    { symbol: 'XLY', color : 0xC4CA40},
    { symbol: 'XLI', color : 0x92C5EB},
    { symbol: 'XLV', color : 0x00ADEE},
    { symbol: 'XLF', color : 0xA6CE39},
    { symbol: 'XLRE', color : 0xA40C1E}
  ];


  constructor(public navCtrl: NavController, private elementRef: ElementRef,
    private fdsgProvider: FdsgProvider) {

      this.chartType = "1M";
      this.symbol = "XLE";
  }

  ionViewDidLoad() {


    //this.createChart();
    
    this.setupChart();

   this.chartType = "1D";

  }

  onSectorChange() {
    this.refreshChart();
  }

  onChartTypeChange() {
    this.refreshChart();
  }

  setupChart(){

    var chartDiv = this.elementRef.nativeElement.querySelector('#chart');

    this.chart = new FDSChartJS(chartDiv, {appName: 'fdsg-app', theme:1, disableLogging: true});

    
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

    var params = this.getHistoricaDataParameters();
//    console.log("params", params);
    this.fdsgProvider.getHistoricalQuotes("US:" + this.symbol, params.start, params.end, params.resolution)
      .subscribe(resp => {

      //  console.log("resp", resp);

        var data : any = (resp as any).data;

        var labels = data.map(p => this.getChartTime(p.lastTimestamp));
        var values = data.map(p => p.last);

//        console.log(this.series);
        // console.log(labels);

        this.series.getData().x.replace(0, labels);
        this.series.getData().y.replace(0, values);
        this.series.setAttribute('Label', 'app', this.symbol);
        this.series.setAttribute('SeriesColor', 'app', this.getSectorColor(this.symbol));

        // Display chart. Per FactSet Charting group, use invalidate instead of draw
        this.chart.invalidate();
      }
    );
    
  }

  convertUTCDateToLocalDate(date) {

    var newDate = new Date(date.getTime()+date.getTimezoneOffset()*60*1000);

    var offset = date.getTimezoneOffset() / 60;
    var hours = date.getHours();

    newDate.setHours(hours - offset);

    return newDate;   
  }

  getChartTime(strDate : string) {

//    let date = new Date(strDate);
    var date = this.convertUTCDateToLocalDate(new Date(strDate));
    return ( date.getTime() / ( 24 * 3600 * 1000  ) + 25569 );

  }
 
  getFormattedDate(date) {
    var year = date.getFullYear();
  
    var month = (1 + date.getMonth()).toString();
    month = month.length > 1 ? month : '0' + month;
  
    var day = date.getDate().toString();
    day = day.length > 1 ? day : '0' + day;
    
    return year + month + day;
  }
  
  getFormattedTime(date) {
    
    var morning = new Date(
          date.getFullYear(),
          date.getMonth(),
          date.getDate(),
          0,0,0);
          
    var secondsFromMorning = (date.getTime() - morning.getTime()) / 1000;

    return secondsFromMorning / (24 * 3600);

  }

  getChartDateTime(date) {

    return parseFloat(this.getFormattedDate(date)) + this.getFormattedTime(date);
    
  }

  getHistoricaDataParameters() {

    switch(this.chartType) {

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
    startDate.setHours(0,0,0,0);
    var endDate = new Date();
    endDate.setHours(23,59,59,0);
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
    startDate.setHours(0,0,0,0);
    var endDate = new Date();
    return { start: startDate.toISOString(), end: endDate.toISOString(), resolution: 'DAY' };
  }

  hh_mm_ss (date) {
    var hour = "" + date.getHours(); if (hour.length == 1) { hour = "0" + hour; }
    var minute = "" + date.getMinutes(); if (minute.length == 1) { minute = "0" + minute; }
    var second = "" + date.getSeconds(); if (second.length == 1) { second = "0" + second; }
    return hour + minute + second;
  }

  getSectorColor(symbol: string) {

    for (let sector of this.sectors) 
    {  
        if( sector.symbol === symbol) {
          return sector.color;
        }
    }  
    return 0x0000;

  }

}
