import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

/*
  Generated class for the ThaiDateConversionProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class ThaiDateConversionProvider {
  displayThaiYear: string;
  thaiYear: number;
  thaiDate: string;
  day: string;
  year: string;
  month: any;
  date: any;

  thaiCalendar: any = [`มกราคม`,
      `กุมภาพันธ์`,
      `มีนาคม`,
      `เมษายน`,
      `พฤษภาคม`,
      `มิถุนายน`,
      `กรกฎาคม`,
      `สิงหาคม`,
      `กันยายน`,
      `ตุลาคม`,
      `พฤศจิกายน`,
      `ธันวาคม`];

  englishCalendar: any = [`January`,
      `February`,
      `March`,
      `April`,
      `May`,
      `June`,
      `July`,
      `August`,
      `September`,
      `October`,
      `November`,
      `December`];
  

  constructor(public http: HttpClient) {
    console.log('Hello ThaiDateConversionProvider Provider');
  }

  convertIsoToDate(date: string, isISODate: boolean, filterUpto: number) {
   if(date!=""){ if (isISODate == true) {
      this.date = date.split('T');
      this.month = this.thaiCalendar[parseInt(date.split('-')[1]) - 1];
      this.day = date.split(' ')[0].substr(8, 2)
      this.year = date.split(' ')[0].substr(0, 4);
      this.thaiYear = parseInt(this.year) + 543;
      if (filterUpto == 2) {
        this.displayThaiYear = this.thaiYear.toString().split(' ')[0].substr(2, 2)
        this.thaiDate = this.day + " " + this.month + " " + this.displayThaiYear;
      }
      else{
        this.thaiDate = this.day + " " + this.month + " " + this.thaiYear;
      }
    }
    else {
      if (filterUpto == 2) {
        this.year = date.split('-')[0].substr(2, 2);
      }
      else {
        this.year = date.split('-')[0].substr(0, 4);
      }
      this.month = this.thaiCalendar[parseInt(date.split('-')[1]) - 1];
      this.day = date.split('-')[2];
      this.thaiDate = this.day + " " + this.month + " " + this.year;
    }
    if (this.month < 10) {
      this.month = "0" + this.month;
    }
    return this.thaiDate;
  }
  else{
    return "";
  }

  }
  /**
   * 
   * @param date ISO date to convert AM PM for now default is  "น" 
   */
  convertIsDateToTime(date: string) {
    if (date == undefined) {
      return "";
    }
    let dateObj = new Date(date);
    let formatedTime = dateObj.toLocaleTimeString('thai', { hour12: true, timeZone: 'Asia/Shanghai' });
    let dateTime = formatedTime.split(' ');
    let time: any = dateTime[0];
    // let amPm = dateTime[1];
    time = time.split(":");
    // if (amPm == "am") {
    //   amPm = "am";
    // } else {
    //   amPm = "น";
    // }
    let conversion = "" + time[0] + ":" + time[1] + " " + "น";
    return conversion;
  }
}
