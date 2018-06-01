import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { FundPropertiesPage } from './fund-properties';

@NgModule({
  declarations: [
    FundPropertiesPage,
  ],
  imports: [
    IonicPageModule.forChild(FundPropertiesPage),
  ],
})
export class FundPropertiesPageModule {}
