import { Component, Input } from '@angular/core';
import { NavController } from 'ionic-angular';
import { SectorSpdrService, FundDocument } from '../../providers/SectorSpdrAPI';
import { DividendDistribution, Dividend } from '../../providers/SectorSpdrAPI';
import { DocumentViewPage } from '../../pages/document-view/document-view';


@Component({
  selector: 'fund-distribution',
  templateUrl: 'fund-distribution.html'
})
export class FundDistributionComponent {

  @Input() symbol: string;

  dividendDistributions: DividendDistribution[] = [];
  distributionYearIndex = 0;
  dividendYearIndex = 0;
  selectedDistribution: DividendDistribution;
  selectedDividends: Dividend[];
  generalDisclaimer: string;
  additionalDisclaimer: string;

  dividendScheduleDocument: FundDocument;

  constructor(public navCtrl: NavController, private sectorSpdrService: SectorSpdrService) {
  }

  ngOnInit() {

    this.sectorSpdrService.getDividendDistributions(this.symbol)
      .subscribe(resp => {
        this.dividendDistributions = resp;

        if (this.dividendDistributions.length > 0) {
          this.selectedDistribution = this.dividendDistributions[this.distributionYearIndex];
          this.selectedDividends = this.dividendDistributions[this.dividendYearIndex].dividends;
        }
      });

    this.sectorSpdrService.getDividendsScheduleDocuments()
      .subscribe(scheduleDocuments => {

        if (scheduleDocuments.length > 0) {
          this.dividendScheduleDocument = scheduleDocuments[0];
        }
      });

    this.sectorSpdrService.getDisclaimerContent('Home Page Disclosure (Mobile)')
      .subscribe(resp => {
        this.generalDisclaimer = resp;
      });

    this.sectorSpdrService.getDisclaimerContent('Distributions Disclosure')
      .subscribe(resp => {
        this.additionalDisclaimer = resp;
      });

  }

  distributionYearChange(val: any) {
    this.selectedDistribution = this.dividendDistributions[this.distributionYearIndex];
  }

  dividendYearChange(val: any) {
    if (this.dividendYearIndex == 100) {
      let lastFourDividends: Dividend[] = [];

      for (var i = 0; i < this.dividendDistributions.length; i++) {
        for (var j = 0; j < this.dividendDistributions[i].dividends.length; j++) {
          lastFourDividends.push(this.dividendDistributions[i].dividends[j]);
          if (lastFourDividends.length > 3) {
            break;
          }
        }
        if (lastFourDividends.length > 3) {
          break;
        }
      }

      // for ( var i = 0; i < this.dividendDistributions[0].dividends.length; i++) {
      //   lastFourDividends.push(this.dividendDistributions[0].dividends[i]);
      // }
      // if( lastFourDividends.length < 4 && this.selectedDividends.length > 1  ) {
      //   for ( var i = 0; i < 4 - lastFourDividends.length && i < this.dividendDistributions[1].dividends.length; i++) {
      //     lastFourDividends.push(this.dividendDistributions[0].dividends[i]);
      //   }
      // }
      this.selectedDividends = lastFourDividends;
    }
    else {
      this.selectedDividends = this.dividendDistributions[this.dividendYearIndex].dividends;
    }
  }

  documentSelected(document: FundDocument) {

    this.navCtrl.push(DocumentViewPage, {
      title: document.title,
      url: document.url
    });

  }

}
