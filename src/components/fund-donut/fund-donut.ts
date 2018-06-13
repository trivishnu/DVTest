import { Component, Input } from '@angular/core';

@Component({
  selector: 'fund-donut',
  templateUrl: 'fund-donut.html'
})
export class FundDonutComponent {

  @Input() color: string;
  @Input() weight: number;

  strokeWeight: string;

  constructor() {

  }

  ngOnInit(){
    let strokeRemainder = 100 - this.weight;
    this.strokeWeight = "" + this.weight + " " + strokeRemainder;
  }
}
