import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Rx';
import { map } from 'rxjs/operators';
import { Platform } from 'ionic-angular';
import { HttpHeaders, HttpParams } from '@angular/common/http';
import { URLSearchParams } from '@angular/http';

import { HttpAngularProvider } from '../http-angular/http-angular';
import { HttpNativeProvider } from '../http-native/http-native';

import { FundDetails, SectorHoldings, FundSnapshot, SectorTracker, DividendDistribution, FundDocument, DailyCalculation, PremiumDistribution, YearPremium, QuarterPremium } from './index';
import { Sector } from './models/sector';
import { Holding } from './models/holding';
import { Dividend } from './models/dividend';
import { FundPerformance } from './models/fund-performance';
import { FundPerformances } from './models/fund-performances';
import { SECTOR_SPDR_SERVER } from '../../config/config';

const SECTORS_LIST_URL: string = '/sectorspdr/api/IDCO.Client.Spdrs.SectorPie/SectorPieApi';
const FUND_DETAILS_URL: string = '/sectorspdr/api/fund-details/';
const FUND_SNAPSHOT_URL: string = '/sectorspdr/IDCO.Products.Etf.Profile/Profile/apiGetSnapshot?etfSymbol=';
const FUND_HOLDINGS_URL: string = '/sectorspdr/api/holdings/';
const SECTOR_TRACKER_URL: string = '/sectorspdr/api/IDCO.Client.Spdrs.SectorTracker/SectorTrackerApi';
const DIVIDEND_DISTRIBUTIONS_URL: string = '/sectorspdr/IDCO.Client.Spdrs.Distributions/Distributions/Distributions';
const QUARTER_END_PERFORMANCE_URL = '/sectorspdr/api/performance/{symbol}/quarterend';
const MONTH_END_PERFORMANCE_URL = '/sectorspdr/api/performance/{symbol}/monthend';
const DAILY_CALCULATION_URL = '/sectorspdr/api/daily-calculation/';
const PREMIUM_DISCOUNT_FREQUENCY_DISTRIBUTION = '/sectorspdr/api/frequency-distribution/';
const ALL_FUNDS_PERFORMANCE = '/sectorspdr/api/IDCO.Client.Spdrs.AllFundsPerformance/AllFundsPerformanceApi';
const EXPENSE_RATIO_URL = '/sectorspdr/api/expense-ratio';
const PIE_DATA_URL = '/sectorspdr/api/pie-data/';
const CONTENT_URL = '/sectorspdr/api/content';
// Document Libraryh
const FUND_DOCUMENTS_URL: string = '/sectorspdr/IDCO.Client.Spdrs.DocumentLibrary/Document/GetFundDocuments';
const DIVIDENDS_SCHEDULE_URL = '/sectorspdr/IDCO.Client.Spdrs.DocumentLibrary/Document/GetDividendSchedule';
const RESEARCH_DOCUMENTS_URL = '/sectorspdr/IDCO.Client.Spdrs.DocumentLibrary/SectorResearch/GetResearchSectorDocuments';
const ALL_FUNDS_DOCUMENTS_URL = '/sectorspdr/IDCO.Client.Spdrs.DocumentLibrary/Document/GetAllFundsDocuments';
const SECTORS_DOCUMENTS_URL = '/sectorspdr/IDCO.Client.Spdrs.DocumentLibrary/Document/GetSectorDocuments';

const SECTOR_PROPERTIES = [
  { symbol: 'XLE', name: 'Energy', color: '#FFCC00', icon: 'energy', startDate: '1998-12-22T04:00:00.000Z' },
  { symbol: 'XLU', name: 'Utilities', color: '#F39200', icon: 'utilities', startDate: '1998-12-22T04:00:00.000Z' },
  { symbol: 'XLK', name: 'Technology', color: '#B530B1', icon: 'technology', startDate: '1998-12-22T04:00:00.000Z' },
  { symbol: 'XLB', name: 'Materials', color: '#8F96CB', icon: 'materials', startDate: '1998-12-22T04:00:00.000Z' },
  { symbol: 'XLP', name: 'Consumer Staples', color: '#009CB4', icon: 'consumer_staples', startDate: '1998-12-22T04:00:00.000Z' },
  { symbol: 'XLY', name: 'Consumer Discretionary', color: '#DEDC00', icon: 'consumer_discretionary', startDate: '1998-12-22T04:00:00.000Z' },
  { symbol: 'XLI', name: 'Industrials', color: '#A3CCE4', icon: 'industrials', startDate: '1998-12-22T04:00:00.000Z' },
  { symbol: 'XLV', name: 'Health_care', color: '#009FEE', icon: 'health_care', startDate: '1998-12-22T04:00:00.000Z' },
  { symbol: 'XLF', name: 'Financials', color: '#AFCA0B', icon: 'financials', startDate: '1998-12-22T04:00:00.000Z' },
  { symbol: 'XLRE', name: 'Real Estate', color: '#D31515', icon: 'real_estate', startDate: '2015-10-08T04:00:00.000Z' },
  { symbol: 'XLC', name: 'Communications', color: '#B164A5', icon: 'communications', startDate: '2018-06-19T04:00:00.000Z' }

];

@Injectable()
export class SectorSpdrService {

  public http: HttpNativeProvider | HttpAngularProvider;
  server: string;
  sectors: Sector[] = [];
  disclaimers = {};

  constructor(private platform: Platform, private angularHttp: HttpAngularProvider, private nativeHttp: HttpNativeProvider) {
    if (this.platform.is('cordova')) {
      this.server = SECTOR_SPDR_SERVER;
      this.http = this.nativeHttp;
    }
    else {
      this.server = '';
      this.http = this.angularHttp;
    }
  }

  initialize() {
    this.getSectorsList().subscribe(sectors => this.sectors = sectors);

    let titles = [
      'All Funds Performance Disclosure',
      'Disclaimer (Desktop)',
      'Disclaimer (Mobile)',
      'Disclaimer header(mobile)',
      'Disclosure',
      'Disclosure (Mobile)',
      'Disclosure header(mobile)',
      'Distributions Disclosure',
      'Premium/Discount Disclosure',
      'Premium/Discount Disclosure (Mobile)',
      'Performance Pages Disclosure (Mobile)',
      'Home Page Disclosure (Mobile)',
      'How To Purchase (Mobile)'
    ];

    this.retreiveContents(titles).subscribe(resp => {
      for (let title in resp) {
        var disclaimerObj = resp[title];
        this.disclaimers[title] = disclaimerObj['ContentHtml'];
      }
    });

  }

  getSectorsList(): Observable<Sector[]> {
    return this.http.get(this.server + SECTORS_LIST_URL)
      .pipe(map(resp => {
        var data = resp as any;
        return data.map(s => {
          var sector = new Sector();
          sector.symbol = s.Symbol;
          sector.sectorName = s.SectorName;
          sector.dateOfLoad = s.DateOfLoad;
          sector.weight = this.numberFromPercent(s.Weight);
          sector.description = s.SectorDescription;
          return sector;
        })
      }));
  }

  getFundDetails(symbol: string): Observable<FundDetails> {
    return this.http.get(this.server + FUND_DETAILS_URL + symbol) as Observable<FundDetails>;
  }

  getFundHoldings(symbol: string): Observable<SectorHoldings> {
    return this.http.get(this.server + FUND_HOLDINGS_URL + symbol)
      .pipe(map(data => {
        var holdings = new SectorHoldings();
        var sectorData = data as any;
        holdings.asOfDate = sectorData.asOfDate;
        holdings.asOfTime = sectorData.asOfTime;
        holdings.items = sectorData.items.map(
          holdingData => {

            var holding = new Holding();
            holding.symbol = holdingData.Symbol
            holding.companyName = holdingData.CompanyName
            holding.indexWeight = this.numberFromPercent(holdingData.IndexWeight);
            holding.last = Number(holdingData.Last);
            holding.change = Number(holdingData.Change);
            holding.percentChange = this.numberFromPercent(holdingData.PercentChange);
            holding.volume = holdingData.Volume
            holding.price52WeeksRange = holdingData.Price52WeeksRange

            return holding
          }
        );
        return holdings;
      }))
  }

  getSnapshot(symbol: string): Observable<FundSnapshot> {
    return this.http.get(this.server + FUND_SNAPSHOT_URL + symbol)
      .pipe(map(results => {

        var snapshotData = results as any[];
        var snapshot = new FundSnapshot();

        for (var i = 0; i < snapshotData.length; i++) {
          var dataSection = snapshotData[i];
          var value = dataSection.Value as string;

          if (dataSection.Name === "Market Cap") {
            snapshot.marketCap = dataSection.Value + " " + dataSection.Unit;
          }
          else if (dataSection.Name === "Shares Outstanding") {
            snapshot.sharesOutstanding = dataSection.Value + " " + dataSection.Unit;
          }
          else if (dataSection.Name === "Exchange Name") {
            snapshot.exchange = dataSection.Value;
          }
          else if (dataSection.Name === "Average Volume") {
            snapshot.averageVolume = dataSection.Value + " " + dataSection.Unit;
          }
          else if (dataSection.Name === "Index Value") {
            snapshot.indexValue = this.numberFromCurrency(dataSection.Value);
            var startIndex = dataSection.DisplayName.indexOf("(");
            var endIndex = dataSection.DisplayName.indexOf(")");
            snapshot.index = dataSection.DisplayName.substring(startIndex + 1, endIndex);
          }
          else if (dataSection.Name === "Index Dividend") {
            snapshot.indexDividend = this.numberFromCurrency(dataSection.Value);
          }
          else if (dataSection.Name === "Index Dividend Yield") {
            snapshot.indexDividendYield = this.numberFromPercent(dataSection.Value);
          }
          else if (dataSection.Name === "Previous Close") {
            snapshot.previousClose = this.numberFromCurrency(dataSection.Value);
          }
          else if (dataSection.Name === "52 Week High") {
            snapshot.fiftyTwoWeekHigh = this.numberFromCurrency(value);
          }
          else if (dataSection.Name === "52 Week Low") {
            snapshot.fiftyTwoWeekLow = this.numberFromCurrency(value);
          }
          else if (dataSection.Name === "Day's High") {
            snapshot.dayHigh = this.numberFromCurrency(value);
          }
          else if (dataSection.Name === "Day's Low") {
            snapshot.dayLow = this.numberFromCurrency(value);
          }
        }

        return snapshot;
      }));
  }

  getSectorTracker(perid: string = "1D"): Observable<SectorTracker[]> {
    var parameters = {
      period: perid
    };

    var url = this.buildUrl(this.server + SECTOR_TRACKER_URL, parameters);

    return this.http.get(url)
      .pipe(map(resp => {
        var data = resp as any;
        return data.map(s => {
          var sectorTracker = new SectorTracker();
          sectorTracker.symbol = s.Symbol;
          var displayName = s.DisplayName as String;
          var startIndex = displayName.indexOf(" (");
          sectorTracker.displayName = displayName.substring(0, startIndex);
//          sectorTracker.displayName = s.DisplayName;
          sectorTracker.changePercent = this.numberFromPercent(s.ChangeString);
          sectorTracker.change = s.Change;
          return sectorTracker;
        })
      }));
  }

  getDividendDistributions(symbol: string, yearsCount: number = 10): Observable<DividendDistribution[]> {
    var parameters = {
      sector: symbol,
      yearsCount: yearsCount
    };

    var url = this.buildUrl(this.server + DIVIDEND_DISTRIBUTIONS_URL, parameters);

    return this.http.get(url)
      .pipe(map(resp => {

        var data = resp as any;
        return data.Distributions.map(res => {
          var d = res as any;
          var dividendDistribution = new DividendDistribution();
          dividendDistribution.year = d.Year;
          dividendDistribution.rate = d.Rate;
          dividendDistribution.ordinaryIncome = d.OrdinaryIncome;
          dividendDistribution.shortTermCapitalGains = d.ShortTermCapitalGains;
          dividendDistribution.longTermCapitalGains = d.LongTermCapitalGains;
          dividendDistribution.returnOfCapital = d.ReturnOfCapital;
          dividendDistribution.dividends = d.Dividends.map(d => {
            var dividend = new Dividend();
            dividend.exDividendDate = d.ExDividendDate;
            dividend.recordDate = d.RecordDate;
            dividend.paymentDate = d.PaymentDate;
            dividend.ratePerShare = d.RatePerShare;
            dividend.ordinaryIncome = d.OrdinaryIncome;
            dividend.shortTermCapitalGains = d.ShortTermCapitalGains;
            dividend.longTermCapitalGains = d.LongTermCapitalGains;
            dividend.returnOfCapital = d.ReturnOfCapital;
            return dividend;
          })
          return dividendDistribution;
        });

      }));
  }

  getFundDocuments(symbol: string): Observable<FundDocument[]> {
    var parameters = {
      symbol: symbol
    };

    var url = this.buildUrl(this.server + FUND_DOCUMENTS_URL, parameters);

    return this.http.get(url)
      .pipe(map(resp => {

        var data = resp as any;
        var firstSector = data[0];
        return firstSector.Files.map(d => {
          var document = new FundDocument();
          document.title = d.Title;
          document.url = this.server + d.Url;
          document.asOfDate = d.AsOfDate;
          return document;
        })
      }));
  }

  getQuarterEndPerformances(symbol: string): Observable<FundPerformances> {
    var url = this.server + QUARTER_END_PERFORMANCE_URL;
    url = url.replace("{symbol}", symbol);

    return this.http.get(url)
      .pipe(map(resp => {

        var d = resp as any;
        var performances = new FundPerformances();
        performances.asOfDate = d.asOfDate;
        performances.performances = d.performanceItems.map(d => {
          var performance = new FundPerformance();
          performance.performanceType = d.sheetMappingId;
          performance.oneMonth = this.numberFromPercent(d.oneMonth);
          performance.latestQuarter = this.numberFromPercent(d.latestQuarter);
          performance.calendarYTD = this.numberFromPercent(d.calendarYTD);
          performance.annualizedOneYear = this.numberFromPercent(d.annualizedOneYear);
          performance.annualizedThreeYear = this.numberFromPercent(d.annualizedThreeYear);
          performance.annualizedFiveYear = this.numberFromPercent(d.annualizedFiveYear);
          performance.annualizedTenYear = this.numberFromPercent(d.annualizedTenYear);
          performance.annualizedInceptionToDate = this.numberFromPercent(d.annualizedInceptionToDate);
          performance.liquidationType = d.liquidationType;
          performance.totalReturnType = d.totalReturnType;
          return performance;
        })

        return performances;

      }));
  }

  getMonthEndPerformances(symbol: string): Observable<FundPerformances> {
    var url = this.server + MONTH_END_PERFORMANCE_URL;
    url = url.replace("{symbol}", symbol);

    return this.http.get(url)
      .pipe(map(resp => {

        var d = resp as any;
        var performances = new FundPerformances();
        performances.asOfDate = d.asOfDate;
        performances.performances = d.performanceItems.map(d => {
          var performance = new FundPerformance();
          performance.performanceType = d.sheetMappingId;
          performance.oneMonth = this.numberFromPercent(d.oneMonth);
          performance.latestQuarter = this.numberFromPercent(d.latestQuarter);
          performance.calendarYTD = this.numberFromPercent(d.calendarYTD);
          performance.annualizedOneYear = this.numberFromPercent(d.annualizedOneYear);
          performance.annualizedThreeYear = this.numberFromPercent(d.annualizedThreeYear);
          performance.annualizedFiveYear = this.numberFromPercent(d.annualizedFiveYear);
          performance.annualizedTenYear = this.numberFromPercent(d.annualizedTenYear);
          performance.annualizedInceptionToDate = this.numberFromPercent(d.annualizedInceptionToDate);
          performance.liquidationType = d.liquidationType;
          performance.totalReturnType = d.totalReturnType;
          return performance;
        })

        return performances;

      }));
  }

  getDailyCalculation(symbol: string): Observable<DailyCalculation> {
    return this.http.get(this.server + DAILY_CALCULATION_URL + symbol)
      .pipe(map(data => {
        var dailyCalculation = new DailyCalculation();
        var calculationData = data as any;
        dailyCalculation.lastTrade = Number(calculationData.LastTrade);
        dailyCalculation.lastTradeToNetAssetValueChange = Number(calculationData.LastTradeToNetAssetValueChange);
        dailyCalculation.lastTradeToNetAssetValuePctChange = this.numberFromPercent(calculationData.LastTradeToNetAssetValuePctChange);
        dailyCalculation.lastUpdateDate = calculationData.LastUpdateDate;
        dailyCalculation.lastUpdateTime = calculationData.LastUpdateTime;
        dailyCalculation.mid = Number(calculationData.Mid);
        dailyCalculation.midToNetAssetValueChange = Number(calculationData.MidToNetAssetValueChange);
        dailyCalculation.midToNetAssetValuePctChange = this.numberFromPercent(calculationData.MidToNetAssetValuePctChange);
        dailyCalculation.netAssetValue = Number(calculationData.NetAssetValue);

        return dailyCalculation;
      }))
  }

  getPremiumDiscountFrequencyDistributions(symbol: string): Observable<PremiumDistribution> {
    return this.http.get(this.server + PREMIUM_DISCOUNT_FREQUENCY_DISTRIBUTION + symbol)
      .pipe(map(data => {
        var premiumDistribution = new PremiumDistribution();
        var distribuionData = data as any;
        premiumDistribution.lastUpdateDate = distribuionData.LastUpdateDate;
        premiumDistribution.lastUpdateTime = distribuionData.LastUpdateTime;
        premiumDistribution.years = distribuionData.Years.map(
          yearlyDistributionData => {

            var yearPremium = new YearPremium();
            yearPremium.year = yearlyDistributionData.Year;
            yearPremium.quarters = yearlyDistributionData.Quarters.map(d => {

              var quarterPremium = new QuarterPremium();
              quarterPremium.quarterEnding = d.QuarterEnding;
              quarterPremium.lowAboveNav = Number(d.LowAboveNav);
              quarterPremium.mediumAboveNav = Number(d.MediumAboveNav);
              quarterPremium.highAboveNav = Number(d.HighAboveNav);
              quarterPremium.lowBelowNav = Number(d.LowBelowNav);
              quarterPremium.mediumBelowNav = Number(d.MediumBelowNav);
              quarterPremium.highBelowNav = Number(d.HighBelowNav);

              return quarterPremium;
            });

            return yearPremium
          }
        );
        return premiumDistribution;
      }))
  }

  getDividendsScheduleDocuments(): Observable<FundDocument[]> {
    return this.http.get(this.server + DIVIDENDS_SCHEDULE_URL)
      .pipe(map(resp => {

        var data = resp as any;
        var firstSector = data[0];
        return firstSector.Files.map(d => {
          var document = new FundDocument();
          document.title = d.Title;
          document.url = d.Url;
          document.asOfDate = d.AsOfDate;
          return document;
        })
      }));
  }

  getAllFundsPerformance(dataType: number, timemode: string): Observable<FundPerformances> {
    var parameters = {
      dataType: dataType,
      timemode: timemode
    };

    var url = this.buildUrl(this.server + ALL_FUNDS_PERFORMANCE, parameters);

    return this.http.get(url)
      .pipe(map(resp => {

        var d = resp as any;
        var performances = new FundPerformances();
        performances.asOfDate = d.asOfDate;
        performances.performances = d.data.map(d => {
          var performance = new FundPerformance();
          performance.symbol = d.Symbol;
          performance.performanceType = dataType;
          performance.oneMonth = this.numberFromPercent(d.OneMonth);
          performance.latestQuarter = this.numberFromPercent(d.LatestQuarter);
          performance.calendarYTD = this.numberFromPercent(d.CalendarYTD);
          performance.annualizedOneYear = this.numberFromPercent(d.AnnualizedOneYear);
          performance.annualizedThreeYear = this.numberFromPercent(d.AnnualizedThreeYear);
          performance.annualizedFiveYear = this.numberFromPercent(d.AnnualizedFiveYear);
          performance.annualizedTenYear = this.numberFromPercent(d.AnnualizedTenYear);
          performance.annualizedInceptionToDate = this.numberFromPercent(d.AnnualizedInceptionToDate);
          return performance;
        })

        return performances;

      }));

  }

  getExpenseRatio() {
    return this.http.get(this.server + EXPENSE_RATIO_URL);
  }


  getSectorEstimatedWeight(symbol: string): Observable<number> {
    return this.http.get(this.server + PIE_DATA_URL + symbol)
      .pipe(map(data => {
        var pieData = data as any;
        return this.numberFromPercent(pieData.estimateWeight);
      }))
  }

  retreiveContents(titles: string[]) {
    var titlesJson = [];
    for (let title of titles) {
      titlesJson.push( { 'Title': title });
    }

    let headers = new HttpHeaders();
    headers = headers.append("content-type", "application/x-www-form-urlencoded; charset=UTF-8");

    return this.http.post(this.server + CONTENT_URL, JSON.stringify(titlesJson), headers);

  }

  buildUrl(url, parameters) {
    var qs = "";
    for (var key in parameters) {
      var value = parameters[key];
      qs += encodeURIComponent(key) + "=" + encodeURIComponent(value) + "&";
    }
    if (qs.length > 0) {
      qs = qs.substring(0, qs.length - 1); //chop off last "&"
      url = url + "?" + qs;
    }
    return url;
  }

  getSectorInfo(symbol: string): Sector {
    for (let sector of this.sectors) {
      if (sector.symbol == symbol)
        return sector;
    }
    return undefined;
  }

  formatCurrency(value: number) {
    var formatter = new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 2,
      // the default value for minimumFractionDigits depends on the currency
      // and is usually already 2
    });

    return formatter.format(value);
  }

  numberFromCurrency(text: string) {
    return Number(text.replace(/[^0-9\.-]+/g, ""));
  }

  numberFromPercent(text: string) {
    var numberString = text.replace('%', '');
    return Number(numberString);
  }

  getSectorColor(symbol: string) {
    for (let sector of SECTOR_PROPERTIES) {
      if (sector.symbol === symbol) {
        return sector.color;
      }
    }
    return '#DBE2E5';
  }

  getStartDate(symbol: string) {
    for (let sector of SECTOR_PROPERTIES) {
      if (sector.symbol === symbol) {
        return sector.startDate;
      }
    }
    return '#DBE2E5';
  }

  getSectorIcon(symbol: string) {
    for (let sector of SECTOR_PROPERTIES) {
      if (sector.symbol === symbol) {
        return sector.icon;
      }
    }
    return '';
  }

  getSectorName(symbol: string) {
    for (let sector of SECTOR_PROPERTIES) {
      if (sector.symbol === symbol) {
        return sector.name;
      }
    }
    return '';
  }

  getDisclaimerCotent(title : string) {
    return this.disclaimers[title];
  }

}
