import { Component, ElementRef } from '@angular/core';
import { Platform, NavController, NavParams } from 'ionic-angular';
import { SectorSpdrService, SectorTracker } from '../../providers/SectorSpdrAPI';

import { FundPropertiesPage } from '../../pages/fund-properties/fund-properties';
import { QuoteService } from '../../providers/FinancialAPI';
import { FINANCIAL_API_SERVER, API_KEY, S_AND_P_ID_NOTATION, S_AND_P_ID_COLOR } from '../../config/config';
import { ChartService } from '../../providers/fdsg/chartService';

const IMAGES_ASSETS_PATH = 'assets/imgs/';

declare var FDSChartJS: any;

@Component({
  selector: 'tracker-charting',
  templateUrl: 'tracker-charting.html'
})
export class TrackerChartingComponent {

  chartType: string;
  chart: any;
  plot: any;
  // series: any;
  windowHeight: any;
  windowWidth: any;
  quoteParams: any;

  sectors : string[] = [ "", "XLB", "XLC", "XLE", "XLF", "XLI", "XLK", "XLP", "XLRE", "XLU", "XLV", "XLY" ];
  rows: number[];
  text: string;
  initialSelectedState = true;
  selectedSectors: string[] = [];
  sectorSeries = {};
  sAndPSeries : any;

  lastValue = 0.0;
  changePercent: number = 0;
  changeGraphics = '';
  changeClass: string = "neutral";

  generalDisclaimer: string;

  sectorSymbol = "xlre";

  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    private sectorSpdrService: SectorSpdrService,
    private quoteService: QuoteService,
    private chartService: ChartService,
    private platform: Platform,
     private elementRef: ElementRef) {
      this.windowWidth = platform.width() * 0.95;
      this.windowHeight = platform.height() * 0.25;
      this.quoteService.setConfiguration(FINANCIAL_API_SERVER, API_KEY);
    }

  
  ngOnInit() {
    this.platform.ready().then(() => {
      this.initialize();
    });
	this.generalDisclaimer = this.sectorSpdrService.getDisclaimerCotent('Disclaimer header(mobile)');
  }

  initialize() {

    this.rows = Array.from(Array(Math.ceil(this.sectors.length / 3)).keys())

    this.quoteService.setConfiguration(FINANCIAL_API_SERVER, API_KEY);
    this.quoteService.getSnapQuotes(S_AND_P_ID_NOTATION, "SectorSpdr")
      .subscribe(resp => {
        if (resp.data.length > 0) {
          var quote = resp.data[0];
          if (quote.valid !== false) {
            this.lastValue = quote.last;
            this.changePercent = quote.changePercent;
            this.changeGraphics = IMAGES_ASSETS_PATH + 'icon_indicator-none-gray.svg';
            if (quote.change > 0) {
              this.changeClass = "positive";
              this.changeGraphics = IMAGES_ASSETS_PATH + 'icon_indicator-up-green.svg';
            }
            else if (quote.change < 0) {
              this.changeClass = "negative";
              this.changeGraphics = IMAGES_ASSETS_PATH + 'icon_indicator-down-red.svg';
            }
          }
        }
      });

    if( this.initialSelectedState ) {
      this.selectedSectors = this.sectors.map(obj => obj);
      this.selectedSectors.shift();
    }

    this.setupChart();
    this.setChartType("Today");
    this.updateChart();
  
    this.generalDisclaimer = this.sectorSpdrService.getDisclaimerCotent('Home Page Disclosure (Mobile)');

  }

  
  setupChart() {

    var chartDiv = this.elementRef.nativeElement.querySelector('#chart');

    this.chart = this.chartService.getChart(chartDiv, this.windowWidth, this.windowHeight);

    this.plot = this.chartService.getChartPlot(this.chart);

    this.chartService.configureChartAxes(this.chart);

  }


  setChartType(type: string) {
    this.chartType = type;
    var historicalQuoteType = this.chartService.getHistoricalQuoteTypeFromTimeline(this.chartType);
    this.quoteParams = this.quoteService.getHistoricaDataParameters(historicalQuoteType);
    if( this.chartType === "Max.") {
      this.quoteParams.start = '1998-12-22T04:00:00.000Z';
    }
  }

  clearChart() {

    this.plot.removeSeries(this.sAndPSeries);
    this.selectedSectors.forEach(sector => {
      this.plot.removeSeries(this.sectorSeries[sector]);
    });
    this.chart.invalidate();
  }

  updateChart() {

    this.addSAndPToChart();
    this.selectedSectors.forEach( sector => {
      this.addSectorToChart(sector);
    });

  }

  addSAndPToChart() {

    this.quoteService.getHistoricalQuotes(S_AND_P_ID_NOTATION, this.quoteParams.start, this.quoteParams.end, this.quoteParams.resolution)
    .subscribe(historicalQuotes => {

      var labels = historicalQuotes.data.map(p => this.chartService.getChartTime(p.lastTimestamp));
      var values = [];
      if( historicalQuotes.data.length > 0 ) {
        var firstValue = historicalQuotes.data[0].last;
        values = historicalQuotes.data.map(p => this.getPercentageChange(firstValue, p.last));
      }

      var xData = new FDSChartJS.models.data({
        dataType: 'DateTime',
        data: labels
      });
  
      var yData = new FDSChartJS.models.data({
        dataType: "float",
        data: values,
      });
  
      this.sAndPSeries = new FDSChartJS.models.series({
        id: "S&P",
        x: xData,
        y: yData,
      });


      this.plot.addSeries(this.sAndPSeries);
      this.sAndPSeries.setAttribute('SeriesColor', 'app', S_AND_P_ID_COLOR);

      this.chart.invalidate();
    });
    
  }


  addSectorToChart(symbol: string) {

    this.quoteService.getHistoricalQuotes("US:" + symbol, this.quoteParams.start, this.quoteParams.end, this.quoteParams.resolution)
    .subscribe(historicalQuotes => {

      var labels = historicalQuotes.data.map(p => this.chartService.getChartTime(p.lastTimestamp));

      var values = [];
      if( historicalQuotes.data.length > 0 ) {
        var firstValue = historicalQuotes.data[0].last;
        values = historicalQuotes.data.map(p => this.getPercentageChange(firstValue, p.last));
      }

      var xData = new FDSChartJS.models.data({
        dataType: 'DateTime',
        data: labels
      });
  
      var yData = new FDSChartJS.models.data({
        dataType: "float",
        data: values,
      });
  
      var series = new FDSChartJS.models.series({
        id: symbol,
        x: xData,
        y: yData,
      });

      this.plot.addSeries(series);
      var color = this.chartService.getColorRef(this.sectorSpdrService.getSectorColor(symbol));
      series.setAttribute('SeriesColor', 'app', color);

      this.sectorSeries[symbol] = series;

      // Display chart. Per FactSet Charting group, use invalidate instead of draw
      this.chart.invalidate();
    });
    
  }



  // End of Chart Section

  
  handleTimelineChange(timeline) {

    this.setChartType(timeline);
    this.updateChart();

  }

  handleSectorSelectionChange(changeInfo) {

    if( changeInfo.selected )
      this.addToSelectedSectors(changeInfo.symbol);
    else
      this.removeFromSelectedSectors(changeInfo.symbol);

  }

  compareSymbol(a: SectorTracker, b: SectorTracker) {
    if (a.symbol < b.symbol)
      return -1;
    if (a.symbol > b.symbol)
      return 1;
    return 0;
  }

  compareString(a: string, b: string) {
    if (a < b)
      return -1;
    if (a > b)
      return 1;
    return 0;
  }

  removeFromSelectedSectors(symbol) {
    for(var i = this.selectedSectors.length - 1; i >= 0; i--) {
      if(this.selectedSectors[i] === symbol) {
        this.selectedSectors.splice(i, 1);
        break;
      }
    }
    this.plot.removeSeries(this.sectorSeries[symbol]);
    this.chart.invalidate();
  }

  addToSelectedSectors(symbol) {
    this.selectedSectors.push(symbol);
    this.selectedSectors.sort(this.compareString);
    this.addSectorToChart(symbol);
  }

  
  getSymbolParam(symbol: string) {
    let symbolParam: any = {};
    symbolParam.symbol = symbol;
    return symbolParam;
  }

  handleTrackerSelected(symbol) {
    this.navCtrl.push(FundPropertiesPage, this.getSymbolParam(symbol));
  }

  getPercentageChange(oldNumber, newNumber){

    // var decreaseValue = oldNumber - newNumber;
    var changeValue = newNumber - oldNumber;

    return (changeValue / oldNumber) * 100;
  }


}
