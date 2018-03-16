import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Keyboard } from '@ionic-native/keyboard';

import { DetailPage } from '../detail/detail';

//import { FdsgProvider } from '../../providers/fdsg/fdsg';

import { AutoCompleteService } from '../../providers/FinancialAPI'


import { SERVER, API_KEY } from '../../config/config';

const SUGGEST_EXCHANGES: string = 'NYS,NAS,AMEX';
const SUGGEST_SECURITY_TYPES: string = 'STO,X-STO.COMMON,X-STO.PREF,ETF,IND,X-FUN.LIPPER,X-DEPOSITORY.RECEIPT,X-STO.RIGHT';

const regExPatterns = [
  /SPDR\b/i,
  /XL\b/i,
  /XPO\b/i,
  /FTSE\b/i,
  /ADR\b/i,
  /NYSE\b/i,
  /ARCA\b/i,
  /U\.S\./i,
  /N\.V\./i,
  /L\.P\./i,
  /LP,/i,
  /FB\b/i,
  /UBS\b/i,
  /AG\b/i,
  /PLC\b/i,
  /BHP\b/i,
  /BP\b/i,
  /BT\b/i,
  /BB&T\b/i,
  /ETF\b/i
];

@IonicPage()
@Component({
  selector: 'page-search',
  templateUrl: 'search.html',
})
export class SearchPage {
  results: any = [];

  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    private autoCompleteService: AutoCompleteService,
    private keyboard: Keyboard) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad SearchPage');
  }

  getItems(ev) {

    this.autoCompleteService.setConfiguration(SERVER, API_KEY);
    this.autoCompleteService.autoComplete(ev.target.value, SUGGEST_EXCHANGES, SUGGEST_SECURITY_TYPES)
      .subscribe(resp => {
        this.results = resp.data;
      }
    );
  }

  resultSelected(selection) {
    // Explicitly close keyboard before adding navigation
    // due to visual glitch of cursor in search bar sticking around
    this.keyboard.close();

    // Jump to the details
    this.navCtrl.push(DetailPage, { title: selection.symbol });
  }

  dismissKeyboard() {
    this.keyboard.close();
  }

  cleanName(name: string) {
    let cleanName = name.toLowerCase();
    regExPatterns.forEach(pattern => cleanName = cleanName.replace(pattern, match => match.toUpperCase()));
    return cleanName;
  }

}
