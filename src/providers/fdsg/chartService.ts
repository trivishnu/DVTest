import { Injectable } from '@angular/core';

@Injectable()
export class ChartService
 {
    
    getChartTime(strDate : string) {
    
        var date = this.convertUTCDateToLocalDate(new Date(strDate));
        return ( date.getTime() / ( 24 * 3600 * 1000  ) + 25569 );
    
    }

    convertUTCDateToLocalDate(date: Date) {

        var newDate = new Date(date.getTime()+date.getTimezoneOffset()*60*1000);
    
        var offset = date.getTimezoneOffset() / 60;
        var hours = date.getHours();
    
        newDate.setHours(hours - offset);
    
        return newDate;   
    }
    

    hh_mm_ss (date: Date) {
        var hour = "" + date.getHours(); if (hour.length == 1) { hour = "0" + hour; }
        var minute = "" + date.getMinutes(); if (minute.length == 1) { minute = "0" + minute; }
        var second = "" + date.getSeconds(); if (second.length == 1) { second = "0" + second; }
        return hour + minute + second;
    }
        
 
    getFormattedDate(date: Date) {
        var year = date.getFullYear();
      
        var month = (1 + date.getMonth()).toString();
        month = month.length > 1 ? month : '0' + month;
      
        var day = date.getDate().toString();
        day = day.length > 1 ? day : '0' + day;
        
        return year + month + day;
      }
      
      getFormattedTime(date: Date) {
        
        var morning = new Date(
              date.getFullYear(),
              date.getMonth(),
              date.getDate(),
              0,0,0);
              
        var secondsFromMorning = (date.getTime() - morning.getTime()) / 1000;
    
        return secondsFromMorning / (24 * 3600);
    
      }
    
      getChartDateTime(date: Date) {
    
        return parseFloat(this.getFormattedDate(date)) + this.getFormattedTime(date);
        
      }
    
}
