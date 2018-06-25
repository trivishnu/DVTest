import { Component, Input, Output, EventEmitter } from '@angular/core';
import { SectorSpdrService } from '../../providers/SectorSpdrAPI';

const IMAGES_ASSETS_PATH = 'assets/imgs/';
@Component({
  selector: 'selector-sector-chart',
  templateUrl: 'selector-sector-chart.html'
})
export class SelectorSectorChartComponent {

  @Input() symbol: string;
  @Input() selected: boolean = false;
  @Output() selectionChanged = new EventEmitter();

  color = "#000000";
  backgroundColor = "#000000";
  symbolColor = "#000000";
  icon = '';

  constructor(private sectorSpdrService: SectorSpdrService) {
  }

  ngOnInit() {
    this.color = this.sectorSpdrService.getSectorColor(this.symbol);
    this.icon = IMAGES_ASSETS_PATH + this.sectorSpdrService.getSectorIcon(this.symbol) + '.svg';
    this.updateSelectedColors();
  }

  selectorTapped() {
    this.selected = !this.selected;
    this.updateSelectedColors();
    this.selectionChanged.emit({ symbol : this.symbol, selected: this.selected});
  }

  updateSelectedColors() {
    this.backgroundColor = this.selected ? this.color : "#00000000";
    this.symbolColor = this.selected ? this.color : "#A9A9A9";
  }

}
