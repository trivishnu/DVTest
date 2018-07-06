import { Component, Input, ElementRef } from '@angular/core';
import { FundDetails } from '../../providers/SectorSpdrAPI';
import { SectorSpdrService } from '../../providers/SectorSpdrAPI';
import { ChartService } from '../../providers/fdsg/chartService';
import { Platform } from 'ionic-angular';
import { QuoteService } from '../../providers/FinancialAPI';

declare var FDSChartJS: any;

@Component({
  selector: 'fund-charting',
  templateUrl: 'fund-charting.html'
})
export class FundChartingComponent {

  @Input() symbol: string;
  sectorSymbol : string;

  chartType: string;
  chart: any;
  plot: any;
  // series: any;
  windowHeight: any;
  windowWidth: any;
  quoteParams: any;

  sAndPSeries : any;
  sectorSeries : any;

  color = "#000000";
  lastValue = 0.0;
  changePercent: number = 0;
  changeClass: string = "neutral";

  lastSAndPValue = 0.0;
  sAndPChangePercent: number = 0;
  sSAndPChangeClass: string = "neutral";

  generalDisclaimer: string;

  constructor(private chartService: ChartService,
    private sectorSpdrService: SectorSpdrService,
    private quoteService: QuoteService,
    private platform: Platform,
    private elementRef: ElementRef) {
      this.windowWidth = platform.width() * 0.95;
      this.windowHeight = platform.height() * 0.25;
  }

  ngOnInit() {
    this.color = this.sectorSpdrService.getSectorColor(this.symbol);
    this.sectorSymbol = this.symbol.toLowerCase();
    this.setupChart();
    this.setChartType("1D");
    this.updateChart();

    this.generalDisclaimer = this.sectorSpdrService.getDisclaimerCotent('Home Page Disclosure (Mobile)');
  }

    
  setupChart() {

    var chartDiv = this.elementRef.nativeElement.querySelector('#sectorChart');

    this.chart = this.chartService.getChart(chartDiv, this.windowWidth, this.windowHeight);

    this.plot = this.chartService.getChartPlot(this.chart);

    this.chartService.configureChartAxes(this.chart);

    this.sAndPSeries = this.getChartSeries("S&P500");
    this.sectorSeries = this.getChartSeries(this.symbol);
    
    this.plot.addSeries(this.sAndPSeries);
    this.plot.addSeries(this.sectorSeries);

    this.sAndPSeries.setAttribute('SeriesColor', 'app', 0xE5E2DB);
    var color = this.chartService.getColorRef(this.sectorSpdrService.getSectorColor(this.symbol));
    this.sectorSeries.setAttribute('SeriesColor', 'app', color);
  }

  getChartSeries(name: string) {
    var xData = new FDSChartJS.models.data({
      dataType: 'DateTime',
      data: []
    });

    var yData = new FDSChartJS.models.data({
      dataType: "float",
      data: [],
    });

    return new FDSChartJS.models.series({
      id: name,
      x: xData,
      y: yData,
    });
  };

  setChartType(type: string) {
    this.chartType = type;
    this.quoteParams = this.quoteService.getHistoricaDataParameters(this.chartType);
    if( this.chartType === "MAX") {
      var startDate = this.sectorSpdrService.getStartDate(this.symbol);
      this.quoteParams.start = startDate;
    }

  }

  updateChart() {

    this.updateSAndPOnChart();
    this.updateSectorOnChart();

  }

  updateSAndPOnChart() {

    this.quoteService.getHistoricalQuotes("XX:4359526", this.quoteParams.start, this.quoteParams.end, this.quoteParams.resolution)
    .subscribe(historicalQuotes => {

      var labels = historicalQuotes.data.map(p => this.chartService.getChartTime(p.lastTimestamp));
      var values = [];
      if( historicalQuotes.data.length > 0 ) {
        this.lastSAndPValue = historicalQuotes.data[historicalQuotes.data.length-1].last;

        var firstValue = historicalQuotes.data[0].last;
        values = historicalQuotes.data.map(p => this.chartService.getPercentageChange(firstValue, p.last));

        this.sAndPChangePercent = values[values.length-1];
        if (this.sAndPChangePercent > 0) {
          this.sSAndPChangeClass = "positive";
        }
        else if (this.changePercent < 0) {
          this.sSAndPChangeClass = "negative";
        }
      }

      this.sAndPSeries.getData().x.replace(0, labels);
      this.sAndPSeries.getData().y.replace(0, values);

      this.chart.invalidate();
    });
    
  }

  updateSectorOnChart() {

    this.quoteService.getHistoricalQuotes("US:" + this.symbol, this.quoteParams.start, this.quoteParams.end, this.quoteParams.resolution)
    .subscribe(historicalQuotes => {

      var labels = historicalQuotes.data.map(p => this.chartService.getChartTime(p.lastTimestamp));
      var values = [];
      if( historicalQuotes.data.length > 0 ) {
        this.lastValue = historicalQuotes.data[historicalQuotes.data.length-1].last;
        var firstValue = historicalQuotes.data[0].last;
        values = historicalQuotes.data.map(p => this.chartService.getPercentageChange(firstValue, p.last));
        this.changePercent = values[values.length-1];
        if (this.changePercent > 0) {
          this.changeClass = "positive";
        }
        else if (this.changePercent < 0) {
          this.changeClass = "negative";
        }

      }

      this.sectorSeries.getData().x.replace(0, labels);
      this.sectorSeries.getData().y.replace(0, values);

      this.chart.invalidate();
    });
    
  }

  fundTimelineChanged(timeline) {

    this.setChartType(timeline);
    this.updateChart();

  }


}
