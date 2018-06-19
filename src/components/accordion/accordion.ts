import { Component, ContentChildren, QueryList, AfterContentInit } from '@angular/core';
import { PanelComponent } from '../panel/panel';
import "rxjs/add/operator/takeWhile";

@Component({
  selector: 'accordion',
  templateUrl: 'accordion.html'
})

export class AccordionComponent implements AfterContentInit {
  @ContentChildren(PanelComponent) panels: QueryList<PanelComponent>;

  private alive: boolean = true;

  ngAfterContentInit() {
    this.panels.toArray()[0].opened = true;
    this.panels.toArray().forEach((panel: PanelComponent) => {
      panel.toggle
        .takeWhile(() => this.alive)
        .subscribe(() => {
        this.openPanel(panel);
      });
    });
  }

  openPanel(panel: PanelComponent) {
    this.panels.toArray().forEach(p => p.opened = false);
    panel.opened = true;
  }

  ngOnDestroy() {
    this.alive = false;
  }

}
