import { Injectable } from '@angular/core';

import { CHART_BG_COLOR } from '../../config/config';
import { HistoricalQuotesType } from '../../providers/FinancialAPI';

declare var FDSChartJS: any;

@Injectable()
export class ChartService {

  getChart(chartDiv, width, height) {

    var chart = new FDSChartJS(chartDiv, {
      appName: 'fdsg-app',
      theme: 2,
      disableLogging: true,
      height: height,
      width: width
    });

    chart.setAttributes({
        'CanvasBGColor' : CHART_BG_COLOR,
        'PlotBGColor' : CHART_BG_COLOR,
        'ChartBGColor' : CHART_BG_COLOR,
    });

    return chart;

  }

  getChartPlot(chart) {

    var plot = new FDSChartJS.models.plot({
      id: "plot"
    });

    // plot.AxisResetOnDataChange = true;

    chart.addPlot(plot);

    plot.setAttribute('AxisResetOnDataChange', 'app', true);


    // Plot attributes

    plot.setAttributes({
      // 'PlotBGColor' : 0xFF0000,
      // 'ChartBGColor': 0xFF0000,
      'Heading1': false,
      'Heading2': false,
      'Legend' : false,
      'UseIntradayScale': true,
      //      'XIntradayLabeling': true,
      'XLabelsLevelsMask': 3,
      'XLabelMinorPadding': 10,
      'XRemoveGapsFromMinorIntervals': 0, //Want to remove gaps from minor labels
      //If auto detection is true, uses that. Otherwise, use XMinorUnitStart/XMinorUnitEnd
      'XAutomaticStartEndDayDetection': false,
      'XMinorUnitStart': '---3-30-0', // Second day starts at 3:30AM when auto detection is off
      'XGrid' : false,
      'PlotFGStyle' : 5,
      'YLabelFormat' : '#1.1F%'
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

    return plot;
  }

  configureChartAxes(chart) {


    var yAxis = chart.getObjectById('FC_plot_Y_AXIS')
    yAxis.setAttributes([{
      level: "user",
      attrs: [
        {id: 'Axis', val: false},
        {id: 'Ticks', val: false},
        // {id: 'LabelPosition', val: 2},
        {id: 'TickMode', val: 2},
        {id: 'Title', val: false},
        {id: 'TitlePosition', val: 1},
        {id: 'FontAlignment', val: 1},
//        {id: 'ThreshMin', val: 1.232323},
        // {id: 'FontColor', val: 0xFF00},     // Labels color
        // {id: 'GridFGColor', val: 0xFF00},    // Grid color
//        {id: 'TicksFGColor', val: 0xFF00FF},  // Ticks color
        // {id: 'AxisFGColor', val: 0xFF00},   // Right Axis Color
        // {id: 'CrosshairsLabelFontColor', val: 0xFF00},
        // {id: 'CrosshairsLabelTextBoxBGColor', val: 0xFF00},
        // {id: 'CrosshairsLabelTextBoxBGGradientColor', val: 0xFF00},
        // {id: 'CrosshairsLabelTextBoxFGColor', val: 0xFF00},
        // {id: 'Font2Color', val: 0xFF00},
        // {id: 'IntradayScaleMajorUnitBGColor', val: 0xFF00},
        // {id: 'IntradayScaleMajorUnitBGGradientColor', val: 0xFF00},
        // {id: 'MinorGridFGColor', val: 0xFF0000},
        // {id: 'OutlierIndicatorBGColor', val: 0xFF0000},
        // {id: 'OutlierIndicatorBGGradientColor', val: 0xFF0000},
        // {id: 'OutlierIndicatorFGColor', val: 0xFF0000},
        // {id: 'ReferenceLineFGColor', val: 0xFF0000},
        // {id: 'TitleFontColor', val: 0xFF0000},
        // {id: 'TickOffset', val: 50},
      ]
    }]);

    var xAxis = chart.getObjectById('FC_plot_X_AXIS')
    xAxis.setAttributes([{
      level: "user",
      attrs: [
        {id: 'Grid', val: false},
      ]
    }]);

  }

  getChartTime(strDate: string) {
    var date = this.convertUTCDateToLocalDate(new Date(strDate));
    return (date.getTime() / (24 * 3600 * 1000) + 25569);
  }

  convertUTCDateToLocalDate(date: Date) {
    var newDate = new Date(date.getTime() + date.getTimezoneOffset() * 60 * 1000);

    var offset = date.getTimezoneOffset() / 60;
    var hours = date.getHours();

    newDate.setHours(hours - offset);

    return newDate;
  }

  hh_mm_ss(date: Date) {
    var hour = "" + date.getHours(); if (hour.length == 1) { hour = "0" + hour; }
    var minute = "" + date.getMinutes(); if (minute.length == 1) { minute = "0" + minute; }
    var second = "" + date.getSeconds(); if (second.length == 1) { second = "0" + second; }
    return hour + minute + second;
  }

  getFormattedDate(date: Date) {
    var year = date.getFullYear();

    var month = (1 + date.getMonth()).toString();
    month = month.length > 1 ? month : '0' + month;

    var day = date.getDate().toString();
    day = day.length > 1 ? day : '0' + day;

    return year + month + day;
  }

  getFormattedTime(date: Date) {
    var morning = new Date(
      date.getFullYear(),
      date.getMonth(),
      date.getDate(),
      0, 0, 0);

    var secondsFromMorning = (date.getTime() - morning.getTime()) / 1000;

    return secondsFromMorning / (24 * 3600);
  }

  getChartDateTime(date: Date) {
    return parseFloat(this.getFormattedDate(date)) + this.getFormattedTime(date);
  }

  getColorRef(sColor: string) : number{

    var components = this.hexToRgb(sColor);

    var color = (components.b << 16) + (components.g << 8) + (components.r);

    return color;
  }

  hexToRgb(hex) {
    // Expand shorthand form (e.g. "03F") to full form (e.g. "0033FF")
    var shorthandRegex = /^#?([a-f\d])([a-f\d])([a-f\d])$/i;
    hex = hex.replace(shorthandRegex, function(m, r, g, b) {
        return r + r + g + g + b + b;
    });

    var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    return result ? {
        r: parseInt(result[1], 16),
        g: parseInt(result[2], 16),
        b: parseInt(result[3], 16)
    } : null;
  }

  getPercentageChange(oldNumber, newNumber){

    var changeValue = newNumber - oldNumber;

    return (changeValue / oldNumber) * 100;
  }

  getHistoricalQuoteTypeFromTimeline(timelineType: string) : HistoricalQuotesType {

    switch(timelineType) {

      case "Today":
        return HistoricalQuotesType.OneDay;

      case "1W":
        return HistoricalQuotesType.OneWeek;

      case "1M":
        return HistoricalQuotesType.OneMonth;

      case "3M":
        return HistoricalQuotesType.ThreeMonths;

      case "6M":
        return HistoricalQuotesType.SixMonths;

      case 'YTD':
      return HistoricalQuotesType.OneDay;

      case "1Y":
        return HistoricalQuotesType.YearToDate;

      case "3Y":
        return HistoricalQuotesType.ThreeYear;

      case "5Y":
        return HistoricalQuotesType.FiveYear;

      case "Max.":
        return HistoricalQuotesType.Maximum;

      default:
        return HistoricalQuotesType.OneDay;

    }
  }

}
