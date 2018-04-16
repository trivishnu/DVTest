import { Dividend } from './dividend'

export class DividendDistribution {
    year : number;
    rate : number;
    ordinaryIncome : number;
    shortTermCapitalGains : number;
    longTermCapitalGains : number;
    returnOfCapital : number;
    dividends : Dividend[];
}
