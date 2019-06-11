import { CacheServiceProvider } from '../../providers/ion-service/cache-service';
import { Component, Input } from '@angular/core';
import { LogServiceProvider } from '../../providers/data-service/log-service';

/**
  * @author Rajul Dixit
  * @description component for policy insurance card.
  */
@Component({
  selector: 'insurance-card',
  templateUrl: 'insurance-card.html'
})
export class InsuranceCardComponent {
@Input ("insuranceCardData") insuranceCardData :any;
@Input ("fromAccountRedirect") fromAccount :any;
insuranceShow:boolean = true;

  constructor(public logger: LogServiceProvider, public cache: CacheServiceProvider) {
    logger.log('Hello InsuranceCardComponent Component');
  }

  ngOnInit(): void {
    console.log("insuranceCardData::::::::",this.insuranceCardData);
    if(this.insuranceCardData.policyRiders.length  > 0  ){
      if (this.insuranceCardData.policyStatus == "inactive" || this.insuranceCardData.policyStatus == "lapsed" || this.insuranceCardData.policyStatus == "surrender" || this.insuranceCardData.policyStatus == "matured") {
        this.insuranceShow = false;
      } else {
        this.insuranceShow = true;
      }
    }else{
      this.insuranceShow = false;
    }
   
    console.log("insurance card show hide" , this.insuranceShow );
     
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.
    //this.convertIsoToDate("2553-พฤศจิกายน-22");
  }

  

  convertIsoToDate(date:string){
    let thaiCalendar: any = [`มกราคม`,
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

  let englishCalendar: any = [`January`,
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
   
    // let date = ISOdate.split('T');
    // let month = thaiCalendar[parseInt(date.split('-')[1])-1];
    let a = date.split(' ')[1];
    let month = thaiCalendar.indexOf(a) + 1;
   
    let year = date.split(' ')[4]
    let day = date.split(' ')[0].substr(0,4);;
    if(month < 10){
      month = "0"+month;
    }
    let thaiDate =  day+"/"+month+"/"+year;
    console.log(thaiDate);
    return thaiDate;

   
  }
}
