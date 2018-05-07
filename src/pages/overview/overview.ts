import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

@IonicPage()
@Component({
  selector: 'page-overview',
  templateUrl: 'overview.html',
})
export class OverviewPage {
  public barChartOptions:any = {
    scaleShowVerticalLines: false,
    responsive: true
  };
  public barChartLabels:string[] = ['2006', '2007', '2008', '2009', '2010', '2011', '2012'];
  public barChartType:string = 'horizontalBar';
  public barChartLegend:boolean = true;

  public barChartData:any[] = [
    {data: [65, 59, 80, 81, 56, 55, 40], label: 'Series A'},
    {data: [28, 48, 40, 19, 86, 27, 90], label: 'Series B'}
  ];

  public barChartColors:Array<any> = [
      { // grey
        backgroundColor: 'rgba(200,159,200,0.2)',
        pointBackgroundColor: 'rgba(148,159,177,1)',
        pointHoverBackgroundColor: '#fff'
      },
      { // dark grey
        backgroundColor: 'rgba(25,83,96,0.2)',
        pointBackgroundColor: 'rgba(77,83,96,1)',
        pointHoverBackgroundColor: '#fff'
      },
      { // grey
        backgroundColor: 'rgba(148,159,177,0.2)',
        pointBackgroundColor: 'rgba(148,159,177,1)',
        pointHoverBackgroundColor: '#fff'
      }
    ];

  // events
  public chartClicked(e:any):void {
    console.log(e);
  }

  public chartHovered(e:any):void {
    console.log(e);
  }

  public randomize():void {
    // Only Change 3 values
    let data = [
      Math.round(Math.random() * 100),
      59,
      80,
      (Math.random() * 100),
      56,
      (Math.random() * 100),
      40];
    let clone = JSON.parse(JSON.stringify(this.barChartData));
    clone[0].data = data;
    this.barChartData = clone;
    /**
     * (My guess), for Angular to recognize the change in the dataset
     * it has to change the dataset variable directly,
     * so one way around it, is to clone the data, change it and then
     * assign it;
     */
  }

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad OverviewPage');
  }

}
