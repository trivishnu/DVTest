import { Component, Input } from '@angular/core';
import { FundDetails } from '../../providers/SectorSpdrAPI';
import { SectorSpdrService } from '../../providers/SectorSpdrAPI';


@Component({
  selector: 'fund-charting',
  templateUrl: 'fund-charting.html'
})
export class FundChartingComponent {

  @Input() symbol: string;


  constructor(private sectorSpdrService: SectorSpdrService) {
  }

  ngOnInit() {

  }

  updateFields(fundDetails: FundDetails) {

  }

}
