import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

/**
 * Generated class for the TrackerPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

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
    console.log(e);
  }

  public chartHovered(e:any):void {
    console.log(e);
  }

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad TrackerPage');
  }

}
