import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'panel',
  templateUrl: 'panel.html'
})
export class PanelComponent {
  @Input() opened = false;
  @Input() title: string;
  @Input() subTitle: string;
  @Output() toggle: EventEmitter<any> = new EventEmitter<any>();

  public getToggleIndicator(){
    if(this.opened){
      return "-";
    } else {
      return "+";
    }
  }
}
