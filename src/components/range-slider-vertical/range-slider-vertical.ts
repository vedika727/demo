import { Component, Input, OnInit } from "@angular/core";
import { Options } from 'ng5-slider';
import { ThaiDateConversionProvider } from "../../providers/thai-date-conversion/thai-date-conversion";

interface SimpleSliderModel {
  value: number;
  options: Options;
}

@Component({
  selector: "range-slider-vertical",
  templateUrl: "range-slider-vertical.html"
})

export class RangeSliderVerticalComponent implements OnInit{
  @Input ('in') policyData:any;

    cashbackArray: any[];
    currentCashback :number=0;
    cashbackTitle:string;
    cashbackDate:string;
    value:any;
    rangePosition:number=0;
    lastPaymentTermPosition:number=0;
    lastPaymentTerm:number=0;
    isShow:boolean=true;
    isLastTerm:boolean=true;
    verticalSlider: SimpleSliderModel;
    deviceHeight:number;

    ngOnInit(){
      this.cashbackArray = [];
      this.deviceHeight = window.screen.height;
      this.getStartDate();
      this.getCurrentDate();
      this.getEndDate();
      this.drawTimeline();
    }
  
    constructor(public thaiDateConverter:ThaiDateConversionProvider) {
    }

    getEndDate(): any {
      let lastObj = {
       date:this.policyData.policyMaturityDate,
       label : "interactiveTimeline.endDate",
       value : "",
       isStatus:"fixed"
      };    
      this.cashbackArray.push(lastObj);
    }

    getCurrentDate(): any {

      let paidCashbacks:any = [];
      let upcomingCashbacks:any = [];

      this.policyData.cashBacks.forEach(element => {
        if(element.cashBackPaidDate==="")
        {
          upcomingCashbacks.push(element);
        }
        else{
          paidCashbacks.push(element);
        }
      });

      if(paidCashbacks!=[]){
        paidCashbacks.forEach(element => {
          let obj ={
            date:element.cashBackPaidDate,
            label : "",
            value : element.cashBackAmount,
            isStatus:"paid"
           };
        this.cashbackArray.push(obj);
        });
      }

      let currObj = {
        date:this.policyData.currentCashBack.cashDateReturnNext,
        label : "",
        value : this.policyData.currentCashBack.cashReturn,
        isStatus:"current"
       };
      this.cashbackArray.push(currObj);

      if(upcomingCashbacks!=[]){
      upcomingCashbacks.forEach(element => {
        let obj ={
          date:element.cashBackDueDate,
          label : "",
          value : element.cashBackAmount,
          isStatus:"upcoming"
         };
      this.cashbackArray.push(obj);  
      });
    }

    let secondLastObj = {
      date:this.policyData.policyLastPaymentTermDate,
      label : "interactiveTimeline.lastPremium",
      value : "",
      isStatus:"lastPaymentTerm"
     };
    this.cashbackArray.push(secondLastObj); 
    this.cashbackArray.sort((a:any,b:any)=>{
        // Turn your strings into dates, and then subtract them
        // to get a value that is either negative, positive, or zero.
        let date1:any=new Date(a.date);
        let date2:any=new Date(b.date);
        return  date1 - date2;
      });
      console.log("This is array",this.cashbackArray);
    }

    getStartDate(): any {
      let firstObj = {
        date:this.policyData.policyEffectiveDate,
        label : "interactiveTimeline.startDate",
        value : "",
       isStatus : "fixed"
      };
      this.cashbackArray.push(firstObj);
    }

    drawTimeline(){ 
      this.cashbackArray.forEach((element,index)=>{ 
        if(element.isStatus === "current") 
        {
          this.currentCashback = index;
        }
        if(element.isStatus === "lastPaymentTerm"){
          this.lastPaymentTerm = index;
        }
      });
      this.setVariables(this.currentCashback);

      this.lastPaymentTermPosition = ((this.deviceHeight/1.5)-75)-(((200)/(this.cashbackArray.length-3))*(this.lastPaymentTerm-1));
      
      this.verticalSlider = {
        value: this.cashbackArray.length-1-this.currentCashback,
        options: {
          floor: 0,
          ceil: this.cashbackArray.length-1,
          vertical: true,
          showSelectionBar:true
        }
      };
    }

    getCashBack(index:number){
      let reverseIndex = this.cashbackArray.length-1-index;
      if((reverseIndex===this.lastPaymentTerm)||(reverseIndex===0||reverseIndex===this.cashbackArray.length-1)){
        this.isShow = false;
      }
      else{
      this.isShow = true;
      this.setVariables(reverseIndex);
      }
    }

    setVariables(index:number){
      this.cashbackTitle = this.cashbackArray[index].label;
      this.cashbackDate = this.cashbackArray[index].date;
      this.value=this.cashbackArray[index].value;

      console.log("THE DEVICE WIDTH IS", window.screen.height);
      
      this.rangePosition = ((200/(this.cashbackArray.length-3))*(index-1));
     
      if(index > this.lastPaymentTerm){
        this.rangePosition+=50;
      }
      else{
        this.rangePosition-=25;
      }

    }
}