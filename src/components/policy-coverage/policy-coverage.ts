import { Component, Input, OnInit } from '@angular/core';
import { CommonModule } from "@angular/common"

 /**
   * @author Banti Sutar
   * @description component for policy coverage details.
   */
@Component({
  selector: 'policy-coverage',
  templateUrl: 'policy-coverage.html'
})
export class PolicyCoverageComponent implements OnInit {
  @Input('in') policyData:any;
  @Input('policyStatus') policyStatus:any;

  // isStatus:boolean=false;
  isIndented:boolean;
  className:string;
  public PolicyCoverageData:any ;
  // isIndent:boolean=true;
  constructor() {
    console.log('Hello CoverageItemComponent Component');
   
  }
  ngOnInit(){
    this.PolicyCoverageData = this.policyData.policyRiders;
    console.log("this data of policy coverage ", this.PolicyCoverageData)
    console.log(" policy coverage item ",this.policyStatus);
    // this.isStatus=true;
    if(this.policyStatus=="terminated" || this.policyStatus=="lapsed"){
      this.isIndented=false;
    }else{
      this.isIndented=true;
    }

  }

}
