import { Component, Input, OnInit } from '@angular/core';
import { HttpServiceProvider } from '../../providers/data-service/http-service';
import { ThaiDateConversionProvider } from '../../providers/thai-date-conversion/thai-date-conversion';

 /**
   * @author Banti Sutar
   * @description component for policy details.
   */
@Component({
  selector: 'policy-details',
  templateUrl: 'policy-details.html'
})
export class PolicyDetailsComponent implements OnInit{
  mockJsonData: any;
  policyInfoData:any = [];
  policyDetaildata:any = [];
  policySumInsured:any;
  policyMaturityDate:any;
  todaysDate:string = new Date().toISOString();
  @Input('In') policyDetail:any
  ngOnInit(): void {
    this.policyDetaildata = this.policyDetail.policyRiders;
    console.log(this.policyDetaildata);
    this.policyDetaildata.forEach((obj)=>{
      //obj.riderPremium = obj.riderPremium.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,');
      obj.riderSumInsured = obj.riderSumInsured.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  //  obj.riderMaturityDate = this.convertIsoToDate1(obj.riderMaturityDate);
    })

    this.policyInfoData =  this.policyDetaildata;
    console.log("Seeeeeee In detail",this.policyDetail.policyMaturityDate);
    this.policySumInsured = this.policyDetail.policySumInsured.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    // this.policyMaturityDate = this.convertIsoToDate(this.policyDetail.policyMaturityDate);

  }
  constructor(
    private httpService:HttpServiceProvider,
    private thaiDateConverter:ThaiDateConversionProvider
  ) {
    // http://internal-aws-elb-sit-k8s-687324875.ap-southeast-1.elb.amazonaws.comv1/v1/policydashboard/policies/40000408
    // console.log('Hello PolicyDetailsComponent Component ',this.policyDetail);
    // console.log('Hello PolicyDetailsComponent Component ',this.policyDetail);
   
  }
  // convertIsoToDate(date:string){
  //   let thaiCalendar: any = [`มกราคม`,
  //   `กุมภาพันธ์`,
  //   `มีนาคม`,
  //   `เมษายน`,
  //   `พฤษภาคม`,
  //   `มิถุนายน`,
  //   `กรกฎาคม`,
  //   `สิงหาคม`,
  //   `กันยายน`,
  //   `ตุลาคม`,
  //   `พฤศจิกายน`,
  //   `ธันวาคม`];

  // let englishCalendar: any = [`January`,
  //   `February`,
  //   `March`,
  //   `April`,
  //   `May`,
  //   `June`,
  //   `July`,
  //   `August`,
  //   `September`,
  //   `October`,
  //   `November`,
  //   `December`];
  //   ;
  //   // let date = ISOdate.split('T');
  //   // let month = thaiCalendar[parseInt(date.split('-')[1])-1];
  //   let a = date.split(' ')[1];
  //   let month = thaiCalendar.indexOf(a) + 1;
   
  //   let year = date.split(' ')[2]
  //   let day = date.split(' ')[0].substr(0,4);
  //   if(month < 10){
  //     month = "0"+month;
  //   }
  //   let thaiDate =  day+"/"+month+"/"+year;
  //   console.log(thaiDate);
  //   return thaiDate;

   
  // }
  // convertIsoToDate1(date:string){
  //   if (date === "") {
  //     return "";
  //   }

  

  //   // let date = ISOdate.split('T');
  //   let month = date.split('-')[1];
  //   let year = date.split('-')[0].substr(2, 2);
  //   let day = date.split('-')[2];

  //   let thaiDate = day + "/" + month + "/" + year;
  //   console.log(thaiDate);
  //   return thaiDate;
   
  // }
  ionViewDidEnter(){
    
    }
}
