export interface Quote {
    identifier: string;
    last: number;
    lastTimestamp: string;
    open: number;
    openTimestamp: string;
    change: number;
    changePercent: number;
    high: number;
    low: number;
    volume: number;
    previousClose: number;
    valid: boolean;
  }
