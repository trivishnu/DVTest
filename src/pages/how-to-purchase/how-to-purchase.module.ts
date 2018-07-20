import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { HowToPurchasePage } from './how-to-purchase';

@NgModule({
  declarations: [
    HowToPurchasePage,
  ],
  imports: [
    IonicPageModule.forChild(HowToPurchasePage),
  ],
})
export class HowToPurchasePageModule {}

