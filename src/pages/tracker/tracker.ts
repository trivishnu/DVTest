import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

import { TapticEngine } from '@ionic-native/taptic-engine';


@IonicPage()
@Component({
  selector: 'page-tracker',
  templateUrl: 'tracker.html',
})
export class TrackerPage {
  // Doughnut
  public doughnutChartLabels:string[] = ['Sector 1', 'Sector 2', 'Sector 3'];
  public doughnutChartData:number[] = [350, 450, 100];
  public doughnutChartType:string = 'doughnut';
  public doughnutChartColors:Array<any> = [{
    backgroundColor: [
      "#b8436d",
      "#00d9f9",
      "#a4c73c"
    ],
    borderColor: [
      "#000000",
      "#000000",
      "#000000"
    ]
    }];

  // events
  public chartClicked(e:any):void {
    //console.log(e);
    this.taptic.selection().
      then(() => console.log("taptic OK")).
      catch(() => console.log("ERROR!"));
  }

  public chartHovered(e:any):void {
    console.log(e);
  }

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private taptic: TapticEngine) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad TrackerPage');
  }

}
