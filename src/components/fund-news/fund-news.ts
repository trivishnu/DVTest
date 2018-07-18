import { Component, Input } from '@angular/core';
import { FundDetails } from '../../providers/SectorSpdrAPI';
import { SectorSpdrService } from '../../providers/SectorSpdrAPI';


@Component({
  selector: 'fund-news',
  templateUrl: 'fund-news.html'
})
export class FundNewsComponent {

  @Input() symbol: string;
  generalDisclaimer: string;

  constructor(private sectorSpdrService: SectorSpdrService) {
  }

  ngOnInit() {
    this.sectorSpdrService.getDisclaimerContent('Home Page Disclosure (Mobile)')
      .subscribe(resp => {
        this.generalDisclaimer = resp;
      });
  }

  updateFields(fundDetails: FundDetails) {

  }

}
